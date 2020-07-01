import Vector3 from "./Vector3.js";

class MyColor extends Vector3 {
    constructor(arr) {
        super();
        if(typeof arr === "undefined" || arr == 0) {
            // Nothing; stay at 0
        } else if(arr instanceof Array) {
            this.setRGB255(...arr);
        } else {
            this.setRGB255(arr, arr, arr);
        }
    }
    
    copy() {
        return new MyColor().setV(this);
    }
    
    setRGB255(r, g, b) {
        return this.setRGB(r/255.0, g/255.0, b/255.0);
    }
    
    setRGB(r, g, b) {
        return this.set(r, g, b, false);
    }
    
    limit() {
        if(this.x > 1) {
            this.x = 1;
        }
        if(this.y > 1) {
            this.y = 1;
        }
        if(this.z > 1) {
            this.z = 1;
        }
    }
    
    getFinal() {
        this.limit();
        return [this.x * 255, this.y * 255, this.z * 255];
    }
}

class Material {
    constructor(c) {
        this.setDiffuse(c);
        this.specularEnabled = false;
        this.reflectEnabled = false;
        this.transparentEnabled = false;
    }
    
    setDiffuse(c) {
        this.diffuse = new MyColor(c);
    }
    
    setSpecular(exp, c = 255) {
        this.specularEnabled = true;
        this.specular = new MyColor(c);
        this.specExp = exp;
    }
    
    setReflect(c = 255) { 
        this.reflectEnabled = true;
        this.reflect = new MyColor(c);
    }
    
    setOpacity(c = 255) {
        this.transparentEnabled = true;
        this.opaqueColor = new MyColor(c);
        this.transColor = this.opaqueColor.copy();
        this.transColor.x = 1 - this.transColor.x;
        this.transColor.y = 1 - this.transColor.y;
        this.transColor.z = 1 - this.transColor.z;
    }
}

class PointLight {
    constructor(pos, c) {
        this.pos = new Vector3(pos);
        this.c = new MyColor(c);
        this.maxSamples = 1;
    }

    randomSample() {
        return this.pos;
    }
}

class AreaLight {
    constructor(tri, c, maxSamples) {
        this.tri = [
            new Vector3(tri[0]),
            new Vector3(tri[1]),
            new Vector3(tri[2])
        ];
        this.c = new MyColor(c);
        this.maxSamples = maxSamples || 10;
    }

    randomSample() {
        // Random point in triangle
        const d1 = Math.random(), d2 = Math.random();
        const d1r = Math.sqrt(d1);
        const p = new Vector3();

        p.scaleAdd(this.tri[0], 1 - d1r)
         .scaleAdd(this.tri[1], d1r * (1 - d2))
         .scaleAdd(this.tri[2], d1r * d2);

        return p;
    }
}

MyColor.BLACK = new MyColor();
MyColor.WHITE = new MyColor(255);

export {MyColor, Material, PointLight, AreaLight}