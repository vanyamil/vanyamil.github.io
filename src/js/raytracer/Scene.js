import {MyColor} from "./Rendering.js";
import Ray from "./Ray.js";
import IntersectionResult from "./IR.js";

export default class Scene {
    constructor() {
        this.materials = {};
        this.lights = [];
        this.setAmbient([0, 0, 0]);
        this.setBG([0, 0, 0]);
        this.setSamples(1);
        this.reflDepth = 0;
        
		// Special stuff for interactive loading
		this.lastX = 0;
		this.lastY = 0;

        // MULTITHREADING WARNING
        this.shadowIR = new IntersectionResult();
    }
    
    setSamples(v) {
        this.samples = [
        	[0.5, 0.5]
        ];
        while(--v > 0) {
            this.samples.push([
            	Math.random(),
            	Math.random()
            ]);
        }
    }
    
    setCamera(cam) {
        this.cam = cam;
    }
    
    setRootNode(root) {
        this.root = root;
    }
    
    setBG(c) {
        this.bg = new MyColor(c);
    }
    
    setAmbient(c) {
        this.ambient = new MyColor(c);
    }
    
    addLight(l) {
        this.lights.push(l);
    }
    
    addMaterial(mat) {
        this.materials[mat.name] = mat;
    }
    
    lighting(ray, IR) {
        const shadowRay = new Ray();
        // Compute reflection ray
        const reflV = ray.dir.reflect(IR.n);
        reflV.mult(-1); // Now points away from surface
        
        const lll = new MyColor([0, 0, 0]);
        
        // Reflective 
        if(IR.material.reflectEnabled && ray.depth > 0) {
            const reflRay = new Ray(IR.p, reflV);
            const reflIR = new IntersectionResult(); // Need a new here due to recursion
            reflRay.setDepth(ray.depth - 1);
            lll.add(this.getColor(reflRay, reflIR));
            lll.multWise(IR.material.reflect);
        } 
        else { // Ambient light
            lll.add(IR.material.diffuse);
            lll.multWise(this.ambient);
        }
        
        // For each light
        this.lights.forEach(function(l) {
            // TODO for each light sample
            
            // Get light vector
            const dv = l.pos.copy().sub(IR.p);
            const dvm = dv.mag();
            if(dvm != 1) {
            	dv.div(dvm);
            }
            
            // Test shadow ray
            shadowRay.set(IR.p, dv);
            shadowRay.setBounds(1e-5, dvm);
            this.shadowIR.reset();
            if(this.root.intersects(shadowRay, this.shadowIR)) {
                return;
            }
            
            // Diffuse
            let angleCoef = Math.max(0, IR.n.dot(dv));
            if(angleCoef <= 0) { return; }
            let tempLight = IR.material.diffuse.copy();
            tempLight.multWise(l.c);
            tempLight.mult(angleCoef);
            lll.add(tempLight);
            
            // Specular
            if(IR.material.specularEnabled) {
                angleCoef = Math.max(0, reflV.dot(dv));
            	if(angleCoef <= 0) { return; }
            	tempLight = IR.material.specular.copy();
            	tempLight.multWise(l.c);
            	tempLight.mult(Math.pow(angleCoef, IR.material.specExp));
            	lll.add(tempLight);
            }
        }, this);       
        
        const c = lll.getFinal();
        return c;
    }
    
    getColor(ray, IR) {
        IR.reset();
        
        if(this.root.intersects(ray, IR)) {
            // Find value for that pixel
            return new MyColor(this.lighting(ray, IR));
        }
        else {
        	// If we don't intersect, default background color
            return this.bg;
        }
    }
    
    getPixel(x, y, ray, IR) {
        const sumColor = new MyColor();
        for(let i = 0; i < this.samples.length; i++) {
            // Generate the ray for this pixel
            const dx = this.samples[i][0];
            const dy = this.samples[i][1];
            if(!this.cam.generateRay(x+dx, y+dy, ray)) {
                console.log("Problem in the code - could not generate camera ray!");
                return;
            }
            
            ray.setDepth(this.reflDepth);
            sumColor.add(this.getColor(ray, IR));
        }
        sumColor.div(this.samples.length);
        return sumColor.getFinal();
    }
    
    draw(timeLimit, sketch) {
        const ray = new Ray();
        const IR = new IntersectionResult();
        
        // Load the pixels into the back buffer
        sketch.loadPixels();
        // console.log("Current dims: " + this.cam.width + "x" + this.cam.height + " pixels");
        
        // Prepare the interactive loop
        const deadline = sketch.millis() + timeLimit;
        let x = this.lastX;
        let y = this.lastY;
        
        // Interactive loop - can only go until time limit
        while(sketch.millis() < deadline) {
        	sketch.set(x, y, sketch.color(this.getPixel(x, y, ray, IR)));
        	x++;
        	if(x == this.cam.width) {
            	x = 0;
            	y++;
            	if(y == this.cam.height) {
                    // Put those pixels into main buffer/canvas
                    sketch.updatePixels();
                    // We finished drawing
                	return true;
            	}
        	}
        }
        // Put those pixels into main buffer/canvas
        sketch.updatePixels();
        // Not yet finished drawing, save state
        this.lastX = x;
        this.lastY = y;
        return false;
    }
}
