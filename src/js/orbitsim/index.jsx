import {p5} from "./helpers.jsx";
import {Earth, Ribbon, FrameTimer, UI, Climber, Payload, Orbit} from "./Classes.jsx";
import $ from "jquery";
import ReactDOM from 'react-dom';
import React from 'react';
import OrbitSim from "./React/OrbitSim.jsx";

var reactTop;

function reactRegister(react) {
	reactTop = react;
}

let s = new p5(function(p5) {
	let hours_per_second;         // Time scale : x simulated hours in a real time second, currently not used
	let sizeScale;                // Space scale : made so all can be drawn

	let timer = new FrameTimer();

	let tracked = null;

	let ZERO_V = p5.createVector(0, 0, 0);

	p5.climbers = [];
	p5.payloads = [];

	p5.preload = function preload() {
	    Earth.IMAGE = p5.loadImage("/res/images/Albedo.jpg"); /* Add public/ for prod */
	}

	p5.setup = function setup() {
		let canvas = this.createCanvas(this.windowWidth, this.windowHeight, this.WEBGL);
		canvas.parent('sketch-holder');
		canvas.id('sim-canvas');
		sizeScale = this.min(this.windowWidth, this.windowHeight) * 0.4 / Ribbon.LENGTH;
	
		// General setup
		this.angleMode(this.RADIANS);
		this.noStroke();
		this.noFill();

		// Main scale
		this.windowResized();
		this.updateTimeScale(5);
	};

	p5.updateTimeScale = function(hps) {
		timer.scale = 86.4 * hps / 24;
	}

	function update() {
		// Update the master timer
		timer.update(p5.millis());

		// Update the positions of objects
		Earth.update(timer);
		p5.climbers.forEach(c => c.update(timer));
		p5.payloads.forEach(p => p.update(timer));
	}

	function handleCamera(idx, climbing_track) {
		var pos;

		if(tracked === null) {
			pos = p5.createVector(0, 0, (p5.height/2.0) / p5.tan(p5.PI*30.0 / 180.0));
			p5.camera(
				pos.x, pos.y, pos.z,
	        	0, 0, 0,
	        	0, -1, 0
	        );

	        p5.perspective();
		}
		else {
			if(climbing_track) { // Climber or payload in climber
				pos = (tracked[0] == 'c' ? p5.climbers[idx] : p5.payloads[idx]).true_position.copy(); 
				pos.addMag(Payload.SIZE).mult(sizeScale);
				pos.y *= -1;

				let up = p5.createVector(0, 0, -1);

				p5.cameraV(
					pos, ZERO_V, up
				);

				// Near plane starts at true location
				p5.perspective(p5.PI / 3, p5.width / p5.height, Payload.SIZE * sizeScale); 
			} else if(p5.payloads[idx].impacted) { // On ground
				pos = p5.payloads[idx].true_position.copy().addMag(Earth.RADIUS *0.5); 
				pos.mult(sizeScale);
				pos.y *= -1;

				let up = p5.createVector(0, 0, -1);

				p5.cameraV(
					pos, ZERO_V, up
				);

				p5.perspective(p5.PI / 3, p5.width / p5.height, 0.01);
			} else { // Released payload
				pos = p5.payloads[idx].true_position.copy(); 
				pos.mult(sizeScale);
				pos.y *= -1;
				let up = p5.payloads[idx].container.momentum.copy();
				up.x *= -1;
				up.z *= -1;

				p5.cameraV(
					pos,  ZERO_V, up
				);

				p5.perspective(p5.PI / 3, p5.width / p5.height, Payload.SIZE * sizeScale);
			}
		}

	    return pos;
	}

	p5.draw = function draw() {
		update();

		// What is being tracked
		let idx = tracked !== null ? parseInt(tracked.substr(1)) : null;
		// Is the tracked object currently climbing
		let climbing_track = tracked !== null && ((tracked[0] == 'c' && p5.climbers[idx] != null) || (tracked[0] == 'p' && p5.payloads[idx].contained))
		// What is the ID of the payload that is tracked during climbing?
		let climbing_pid = climbing_track 
			? (tracked[0] == 'p' 
				? idx // We're tracking that payload
				: // Need to find ID of payload that is inside this climber
				p5.payloads.indexOf(p5.climbers[idx].payload)
			) 
			: null;
		// What is the ID of the climber that is tracked during climbing?
		let climbing_cid = climbing_track 
			? (tracked[0] == 'c' 
				? idx // We're tracking that climber
				: // Need to find ID of climber that has this payload
				p5.climbers.indexOf(p5.payloads[idx].container)
			) 
			: null;

		let camera_pos = handleCamera(idx, climbing_track).div(sizeScale);
		camera_pos.y *= -1;

		// Draw the UI
		reactTop.forceUpdate();

	    // Wipe the buffers by drawing a background
	    p5.background(10);
	  
	    // Set up the default transformation : rotation due to earth and scale
	    p5.scale(sizeScale, -sizeScale, sizeScale);  // -y so that +y points up
	    Earth.draw(p5);
	    Ribbon.draw(p5, camera_pos, climbing_track);
	    p5.climbers.forEach((c, index) => (!(climbing_track && index == climbing_cid)) && c.draw(p5));
	    p5.payloads.forEach((p, index) => (!(climbing_track && index == climbing_pid)) && p.draw(p5));
	};

	p5.windowResized = function windowResized() {
		let parent = $("#sketch-holder");
		// -6 : compensation for auto stretching??
		sizeScale = this.min(parent.width(), parent.height() - 6) * 0.4 / Ribbon.LENGTH;
		this.resizeCanvas(parent.width(), parent.height() - 6);
	}

	p5.toggleTimer = function() {
		timer.toggle();
	}

	p5.timeInDays = function() {
		return (timer.total / Earth.PERIOD).toFixed(2);
	}

	p5.launch = function(c_idx, height, tta) { // Let's use indices just in case the copy is not deep?
		// We receive height in km (need m) and tta in days (need s)
		let climber = p5.climbers[c_idx];
		climber.launch(timer.total, tta * Earth.PERIOD, climber.height, height * 1000);
	}

	p5.track = function(str) {
		if(str == undefined)
			tracked = null;
		else
			tracked = str;
	}

	p5.getTracked = function() { return tracked; }
});

// Due to some classes requiring p5 math, need to pass as static down
Climber.p5 = s;
Orbit.p5 = s;
Payload.p5 = s;

let orbitSimReact = <OrbitSim p5={s} register={reactRegister} />;
export default orbitSimReact;

/*
if (document.getElementById('root')) {
	ReactDOM.render(orbitSimReact, document.getElementById('root'));
}
*/