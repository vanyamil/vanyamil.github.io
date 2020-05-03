import {Material} from "./Rendering.js";
import IntersectionResult from "./IR.js";
import Matrix4 from "./Matrix4.js";
import Ray from "./Ray.js";
import Vector3 from "./Vector3.js";

class Intersectable {
    constructor(mat = new Material()) {
        this.setMaterial(mat);
    }
    
    intersects(ray, outIR) {
        console.log("You did not implement the Intersects method for this object!");
        return false;
    }
    
    setMaterial(mat) {
        this.material = mat;
    }
}

class SceneNode extends Intersectable {
    constructor(children) {
        super();
        this.children = children;
        this.count = children.length;
        // MULTITHREADING WARNING
        this.localIR = new IntersectionResult();
    }
    
    setBounds(obj) {
        this.bounds = obj;
    }
    
    // Returns closest intersection across all children
    intersects(ray, outIR) {
        // Are we intersecting bounds, if any?
        if(typeof this.bounds !== "undefined") {
            this.localIR.reset();
            if(!this.bounds.intersects(ray, this.localIR)) {
                return false;
            }
        }
        
        // Actual test inside
        const rayMax = ray.max;
        for(let i = this.count - 1; i >= 0; i--) {
            this.localIR.reset();
            if(this.children[i].intersects(ray, this.localIR)) {
                outIR.setOther(this.localIR);
                ray.setMax(outIR.t);
            }
        }
        ray.setMax(rayMax);
        return outIR.connects;
    }
}

class MatrixTransform extends Intersectable {
    constructor(child, t, r, s) {
        super();
        this.child = child;
        this.setMatrix(t, r, s);
        // MULTITHREADING WARNING
        this.localRay = new Ray();
    }
    
    setMatrix(t, r, s) {
        this.m = new Matrix4();
        // Order of operations : S * Rz * Ry * Rx * T * v?
        this.m.scale(s).rotate(new Vector3(...r)).translate(t);
        // Saving two other matrices too : inverse, and inv transpose
        this.mInv = this.m.copy().inverse();
        this.mIt = this.mInv.copy().transpose();
    }
    
    intersects(ray, outIR) {
        this.localRay.setOther(ray);
        // M transforms the object
        // We need to transform ray with inverse to send to object
        this.mInv.transP(this.localRay.src);
        this.mInv.transV(this.localRay.dir);
        // If the matrix scales direction, need to modify bounds and t values!
        let scale = this.localRay.dir.mag();
        if(this.localRay.min != 1e-5) {
        	this.localRay.min *= scale;
        }
        this.localRay.max *= scale;
        // Note the division here to make next two operations multiplications
        scale = 1/scale;
        this.localRay.dir.mult(scale); 
        
        if(!this.child.intersects(this.localRay, outIR)) {
            return false;
        }
        // Then pass the resulting point through M
        this.m.transP(outIR.p);
        // Resulting normal through inverse transpose
        this.mIt.transV(outIR.n);
        // Scale t by the proper direction value
        outIR.t *= scale;
        return true;
    }
}

class Sphere extends Intersectable {
    constructor(pos, rad) {
        super();
        this.c = new Vector3(...pos);
        this.r = rad;
    }
    
    intersects(ray, outIR) {
        // Follows the equation (ray.p - c + t * ray.d)^2 = r^2, solves the quadratic for t
        
        // Couple of constants
        // const dd = ray.dir.dot(ray.dir); // ray dir is normalized, so just no need of this variable
        const px = ray.src.x - this.c.x;
        const py = ray.src.y - this.c.y;
        const pz = ray.src.z - this.c.z;
        const qC = px * px + py * py + pz * pz - this.r * this.r;
        const dp = ray.dir.dotArr(px, py, pz);
        
        // Determinant check - if this is below 0, no intersection
        const det = dp * dp - qC;
        if(det < 0) {
            return false;
        }
        const sqrtDet = Math.sqrt(det);
        // Check lower value against ray bounds
        let t = -dp - sqrtDet;
        if(ray.at(t, outIR.p)) {
            outIR.setIntersection(t, outIR.p, Vector3.sub(outIR.p, this.c), this.material);
            return true;
        }
        // Check upper value against ray bounds
        t += 2 * sqrtDet;
        if(ray.at(t, outIR.p)) {
            outIR.setIntersection(t, outIR.p, Vector3.sub(outIR.p, this.c), this.material);
            return true;
        }
        
        // Neither t matches
        return false;
    }
}

class Plane extends Intersectable {
    constructor(mat2 = null) {
        super();
        this.setAltMaterial(mat2);
    }
    
    setAltMaterial(mat2) {
        this.mat2 = mat2;
    }
    
    intersects(ray, outIR) {
        if(ray.dir.y * ray.src.y >= 0) {
            // Going away from y = 0
            return false;
        }
        let t = -ray.src.y / ray.dir.y;
        if(ray.at(t, outIR.p)) {
            let b = Math.floor(outIR.p.x) + Math.floor(outIR.p.z);
            let m = this.mat2 == null || ((b % 2) + 2) % 2 < 1 ? this.material : this.mat2;
            let n = ray.src.y > 0 ? new Vector3(0, 1, 0) : new Vector3(0, -1, 0);
            outIR.setIntersection(t, outIR.p, n, m);
            return true;
        }
        return false;
    }
}

class Box extends Intersectable {
    constructor(min, max) {
        super();
        this.min = new Vector3(...min);
        this.max = new Vector3(...max);
    }
    
    intersects(ray, outIR) {
        let intervalClose = ray.min;
        let intervalFar = ray.max;
        let normalClose = null;
        let normalFar = null;
        // For each of the 3 slabs - if putting in a loop, need to use reduce so that the interval test can follow each coord
        for(let i = 0; i < 3; i++) {
        	// Comments given as if for X - equivalent for other dims
            let d = ray.dir.at(i);
            const s = ray.src.at(i);
            
            if(d == 0) { // in the YZ plane
                if(s <= this.min.at(i) || s >= this.max.at(i)) { // Out of X-slab
                    return false;
                } // Else, fully in x-slab, keep interval as is
            } else {
                // Low normal
                let n = -1;
                // GOnna divide by d, so do so only once
                d = 1 / d;
                const tMin = (this.min.at(i) - s) * d;
                const tMax = (this.max.at(i) - s) * d;
                // Which t is smaller
                let tLow, tHigh;
                if(tMin < tMax) {
                    tLow = tMin;
                    tHigh = tMax;
                    n = 1;
                } else {
                    tLow = tMax;
                    tHigh = tMin;
                    n = 0;
                }
                // Update interval and normals
                if(intervalClose < tLow) {
                    intervalClose = tLow;
                    normalClose = i*2 + n;
                }
                if(intervalFar > tHigh) {
                    intervalFar = tHigh;
                    normalFar = i*2 + 1 - n; 
                }
            }
            // Have we gone inside out
            if(intervalClose >= intervalFar) {
                return false;
            }
        }
        
        // Setup the ray
        if(intervalClose > ray.min && ray.at(intervalClose, outIR.p)) {
            outIR.setIntersection(intervalClose, outIR.p, Box.normals[normalClose], this.material);
            return true;
        }
        if(intervalFar < ray.max && ray.at(intervalFar, outIR.p)) {
            outIR.setIntersection(intervalFar, outIR.p, Box.normals[normalFar], this.material);
            return true;
        }
        
        return false;
    }
}

Box.normals = [
    new Vector3(1, 0, 0), new Vector3(-1, 0, 0),
    new Vector3(0, 1, 0), new Vector3(0, -1, 0),
    new Vector3(0, 0, 1), new Vector3(0, 0, -1)
];

export {SceneNode, MatrixTransform, Sphere, Plane, Box}