import Camera from "./Camera.js";
import Scene from "./Scene.js";
import {Material, PointLight} from "./Rendering.js";
import * as inter from "./Intersectables.js";


export default class SceneLoader {
    constructor(json) {
        this.scene = new Scene();
        this.refMap = {}; // Object names to objects
        this.loadScene(json);
    }
    
    loadCamera(json) {
        const cam = new Camera(
            json.pos, 
            json.lookAt, 
            json.up 
        );
        cam.setScreen(json.screen.w, json.screen.h, json.fovy);
        return cam;
    }
    
    loadMaterial(json) {
        // If material is just a reference, try and get it
        if(typeof json === "string") {
            if(this.scene.materials[json] === "undefined") {
                throw "Material reference to non-existent material!";
            } else {
                return this.scene.materials[json];
            }
        }       
        
        // Load material from scratch
        const mat = new Material(json.diffuse);
        if(typeof json.name !== "undefined") {
            mat.name = json.name;
        }        
        if(typeof json.specExp !== "undefined") {
            mat.setSpecular(json.specExp, json.specular);
        }
        if(typeof json.reflect !== "undefined") {
            if(json.reflect === true) {
                mat.setReflect();
            } else {
            	mat.setReflect(json.reflect);
            }
        }
        
        return mat;
    }
    
    loadLight(json) {
        const c = json.color;
        return new PointLight(json.pos, c);
    }
    
    loadInter(json) {
        // If we just state a reference, check the map.
        if(typeof json === "string") {
            if(this.refMap[json] === "undefined") {
                throw "Object reference to non-existent object!";
            } else {
                return this.refMap[json];
            }
        }  
        
        let outp = null;
        switch(json.type.toLowerCase()) {
            case "plane": outp = this.loadPlane(json); break;
            case "node": outp = this.loadNode(json); break;
            case "sphere": outp = this.loadSphere(json); break;
            case "box": outp = this.loadBox(json); break;
            case "transform": outp = this.loadTransform(json); break;
            default: throw "You did not implement a loader for this object";
        }
        // Default material
        if(outp !== null && typeof json.material !== "undefined") {
        	outp.setMaterial(this.loadMaterial(json.material));
        }
        // Name?
        if(outp !== null && typeof json.name !== "undefined") {
            outp.name = json.name;
            this.refMap[outp.name] = outp;
        }
        
        return outp;
    }
    
    loadNode(json) {
        const children = [];
        for(const i in json.children) {
            children.push(this.loadInter(json.children[i]));
        }
        
        const node = new inter.SceneNode(children);
        if(typeof json.bounds !== "undefined") {
            node.setBounds(this.loadInter(json.bounds));
        }
        return node;
    }
    
    loadPlane(json) {
        let mat2 = null;
        if(typeof json.mat2 !== "undefined") {
            mat2 = this.loadMaterial(json.mat2);
        }
        
        return new inter.Plane(mat2);
    }
    
    loadSphere(json) {
        return new inter.Sphere(json.pos || [0, 0, 0], json.radius || 1);
    }
    
    loadBox(json) {
        return new inter.Box(json.min, json.max);
    }
    
    loadTransform(json) {
        const child = this.loadInter(json.child);
        const t = json.translate;
        const r = (typeof json.rotate === "undefined" ? [0, 0, 0] : json.rotate);
        const s = (typeof json.scale === "undefined" ? 1 : json.scale);
        
        return new inter.MatrixTransform(child, t, r, s);
    }
    
    loadScene(json) {    
        // Simple properties        
        if(typeof json.samples !== "undefined") {
            this.scene.setSamples(json.samples);
        }
        if(typeof json.reflDepth !== "undefined") {
            this.scene.reflDepth = json.reflDepth;
        }
        if(typeof json.ambient !== "undefined") {
            this.scene.setAmbient(json.ambient);
        }
        if(typeof json.bg !== "undefined") {
            this.scene.setBG(json.bg);
        }
        
        // Harder properties
        if(typeof json.lights !== "undefined") {
            for(let i in json.lights) {
                this.scene.addLight(this.loadLight(json.lights[i]));
            }
        }
        if(typeof json.materials !== "undefined") {
            for(let i in json.materials) {
                this.scene.addMaterial(this.loadMaterial(json.materials[i]));
            }
        }
        this.scene.setCamera(this.loadCamera(json.camera));
        
        // Scene graph
        this.scene.setRootNode(this.loadInter(json.root));
    }
}
