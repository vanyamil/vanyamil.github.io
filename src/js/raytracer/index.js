import p5 from "p5";
import SceneLoader from "./SceneLoader.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let s = new p5((sketch) => {
    sketch.preload = () => {
        sketch.json = sketch.loadJSON("/raytracer/scenes/emptyScene.json");
    };
    
    sketch.setup = () => {
        sketch.scene = (new SceneLoader(sketch.json)).scene;
        console.log(sketch.scene);
        
        // P5 settings
        sketch.startTime = sketch.millis();
        const canvas = sketch.createCanvas(sketch.scene.cam.width, sketch.scene.cam.height);
        canvas.class("mx-auto");
        sketch.frameRate(30);
            
        // Load the pixels into the back buffer
        sketch.loadPixels();
    };
    
    sketch.draw = () => {
    	if(sketch.scene.draw(1000/40, sketch)) { // Roughly 40 FPS limit on ray-tracing, around 30 with overheads
        	console.log("Completed drawing in " + (sketch.millis() - sketch.startTime) + " ms.");
        	sketch.noLoop();
    	}

        const totalTime = (sketch.millis() - sketch.startTime) / 1000;
        sketch.select("#runtime").html(totalTime.toFixed(1));
        sketch.select("#remtime").html((totalTime * (sketch.scene.cam.width * sketch.scene.cam.height / sketch.scene.numPixel - 1)).toFixed(1));
    };
    
    sketch.drawFrom = (json) => {
        sketch.noLoop();
        delete sketch.scene;
        sketch.scene = (new SceneLoader(json)).scene;
        sketch.startTime = sketch.millis();
        sketch.resizeCanvas(sketch.scene.cam.width, sketch.scene.cam.height);
        sketch.loop();
    };
    
    sketch.loadAndDraw = (jsonURL) => {
        sketch.loadJSON(jsonURL, sketch.drawFrom);
    }
}, "canvasHolder");

export default s;