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
        this.numPixel = 0;

        // MULTITHREADING WARNING
        this.shadowIR = new IntersectionResult();
        this.pixelColor = new MyColor();
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
        
        const lll = new MyColor();
        const transColor = new MyColor();
        
        // Transparency - color controls pass-through ray, 1 - color is the rest.
        if(IR.material.transparentEnabled && ray.depth > 0) {
            // Send through-ray
            const transRay = new Ray(IR.p, ray.dir);
            const transIR = new IntersectionResult();
            transRay.setDepth(ray.depth - 1);
            transColor.add(IR.material.transColor);
            transRay.addInfluence(IR.material.transColor);
            const onlyTrans = transColor.x == 1 && transColor.y == 1 && transColor.z == 1;
            transColor.multWise(this.getColor(transRay, transIR));
            if(onlyTrans) {
                return transColor.getFinal();
            }
        }

        // Reflective 
        if(IR.material.reflectEnabled && ray.depth > 0) {
            const reflRay = new Ray(IR.p, reflV);
            const reflIR = new IntersectionResult(); // Need a new here due to recursion
            reflRay.setDepth(ray.depth - 1);
            reflRay.addInfluence(IR.material.reflect);
            lll.add(this.getColor(reflRay, reflIR));
            lll.multWise(IR.material.reflect);
        } 
        else { // Ambient light
            lll.add(IR.material.diffuse);
            lll.multWise(this.ambient);
        }

        
        // For each light
        this.lights.forEach(function(l) {
            // for each light sample
            const thisLight = new MyColor();
            let tempLight = new MyColor();
            let lightFilter = new MyColor();

            for(let lSample = 0; lSample < l.maxSamples; lSample++) {
            
                // Get light vector
                const dv = l.randomSample().copy().sub(IR.p);
                const dvm = dv.mag();
                if(dvm != 1) {
                	dv.div(dvm);
                }
                
                // Test shadow ray
                shadowRay.set(IR.p, dv);
                shadowRay.setBounds(1e-5, dvm);
                this.shadowIR.reset();
                let inShadow = false;
                lightFilter.setV(MyColor.WHITE);

                while(this.root.intersects(shadowRay, this.shadowIR)) {
                    if(this.shadowIR.material.transparentEnabled) {
                        lightFilter.multWise(this.shadowIR.material.transColor);
                        shadowRay.setMin(this.shadowIR.t + 1e-5);
                        this.shadowIR.reset();
                    } else {
                        inShadow = true;
                        break;
                    }
                }
                if(inShadow) continue;
                
                // Diffuse
                let angleCoef = Math.max(0, IR.n.dot(dv));
                if(angleCoef <= 0) { continue; }
                tempLight.setV(IR.material.diffuse);
                tempLight.mult(angleCoef);
                tempLight.multWise(lightFilter);
                thisLight.add(tempLight);
                
                // Specular
                if(IR.material.specularEnabled) {
                    angleCoef = Math.max(0, reflV.dot(dv));
                	if(angleCoef <= 0) { continue; }
                	tempLight.setV(IR.material.specular);
                	tempLight.mult(Math.pow(angleCoef, IR.material.specExp));
                    tempLight.multWise(lightFilter);
                	thisLight.add(tempLight);
                }
            }

            thisLight.multWise(l.c);
            thisLight.div(l.maxSamples);
            lll.add(thisLight);
        }, this);       

        // Transparency - complete
        if(IR.material.transparentEnabled && ray.depth > 0) {
            lll.multWise(IR.material.opaqueColor);
            lll.add(transColor);
        }
        
        const c = lll.getFinal();
        return c;
    }
    
    getColor(ray, IR) {
        // If this ray's influence is too low, just skip and return black.
        if(ray.influence.x < 0.01 && ray.influence.y < 0.01 && ray.influence.z < 0.01) {
            return MyColor.BLACK;
        }

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
        this.pixelColor.set(0, 0, 0, false);
        const dofn = this.cam.dof.samples.length;
        const sn = this.samples.length;

        for(let i = 0; i < sn; i++) {
            // Generate the ray for this pixel
            const dx = this.samples[i][0];
            const dy = this.samples[i][1];
            
            // Add DOF generation
            for(let j = 0; j < dofn; j++) {
                if(!this.cam.generateRay(x+dx, y+dy, j, ray)) {
                    console.log("Problem in the code - could not generate camera ray!");
                    return;
                }

                ray.setDepth(this.reflDepth);
                this.pixelColor.add(this.getColor(ray, IR));
            }
        }
        this.pixelColor.div(sn * dofn);
        return this.pixelColor.getFinal();
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
            this.numPixel++;
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

