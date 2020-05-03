import Vector3 from "./Vector3.js";

export default class Camera {
    constructor(pos, lookAt, up) {
        this.pos = new Vector3();
        this.dir = new Vector3();
        this.lookAt = new Vector3();
        this.set(pos, lookAt, up);
        
        this.dof = {};
        this.setDOF(this.lookAt.copy(), this.dir.copy(), 1, 1);
    }
    
    set(pos, lookAt, up) {
        this.lookAt.set(...lookAt);
        // Camera location
        this.pos.set(...pos);
        // Viewing direction
        this.dir.set(this.lookAt).sub(this.pos).normalize();
        // The "right" vector - the X coordinate of the screen will be along it
        this.right = new Vector3(up).cross(this.dir).normalize();
        // The "up" vector - the Y coordinate of the screen will be along it
        this.up = this.dir.cross(this.right).normalize(); // Should already be normalized, but doing for rounding errors
    }
    
    setScreen(width, height, fovy) {
        // Screen width
        this.width = width;
        this.width2 = width / 2;
        // Screen height
        this.height = height;
        this.height2 = height / 2;
        // Field-of-view angle and aspect ratio considerations
        this.fovy = fovy;
        let tanned = Math.tan(fovy * Math.PI/360); // Angle given in degrees; switch to radians and divide by 2
        // Vector from camera position to center of screen
        this.vToScreen = this.dir.copy().setMag(this.height2 / tanned).setSaving(false);
    }

    // Returns the t for a ray to hit the focus plane
    dofDistToFocus(ray) {
        const v = Vector3.sub(this.dof.p, ray.src);
        return this.dof.n.dot(v) / this.dof.n.dot(ray.dir);
    }

    // Transforms the ray w.r.t. the i-th DOF sample.
    modifyRayDOF(dof_i, ray) {
        const p = new Vector3();
        // Ray parallel to focus plane or not allowed?
        if(!ray.at(this.dofDistToFocus(ray), p)) 
            return;

        // We will move our eye slightly
        ray.src.scaleAdd(this.right, this.dof.samples[dof_i][0])
               .scaleAdd(this.up, this.dof.samples[dof_i][1]);

        // We will be looking towards point p still
        ray.dir.set(p)
               .sub(ray.src)
               .normalize();
    }
    
    setDOF(point, normal, aperture, samples) {
        if(point) {
        	this.dof.p = new Vector3(point);
        }
        if(normal) {
        	this.dof.n = new Vector3(normal);
            this.dof.n.normalize();
        }
        this.dof.a = aperture;
        this.setDOFSamples(Math.max(samples, 1));
    }
    
    setDOFSamples(v) {
        this.dof.samples = [
            [0, 0]
        ];
        while(--v > 0) {
            this.dof.samples.push([
                (Math.random()-0.5) * this.dof.a,
                (Math.random()-0.5) * this.dof.a
            ]);
        }
    }
    
    generateRay(x, y, dof_i, outR) {
        if(x < 0 || y < 0 || x > this.width || y > this.height) { // Removed testing || !(outR instanceof Ray)
            return false;
        }
        
        x -= this.width2;
        y -= this.height2;
        y = -y;
        
        // Direction composed of vector to screen + vector along screen's X and Y
        let dir = this.vToScreen.copy();
        dir.scaleAdd(this.right, x);
        dir.scaleAdd(this.up, y);
        // Ray origin is camera position
        outR.set(this.pos, dir);
        outR.resetBounds();

        this.modifyRayDOF(dof_i, outR);
        
        return true;
    }
}
