import Vector3 from "./Vector3.js";

export default class Ray {
	constructor(src, dir) {
		if(typeof src === "undefined") {
			this.src = new Vector3();
			this.dir = new Vector3();
		} else {
			this.src = src.copy();
			this.dir = dir.copy();
		}
		this.resetBounds();

		this.influence = new Vector3(1, 1, 1);
	}

	set(src, dir) {
		this.src.setV(src);
		this.dir.setV(dir);
		this.dir.normalize();
	}
	
	setOther(other) {
		this.src.setV(other.src);
		this.dir.setV(other.dir);
		this.setBounds(other.min, other.max);
		this.influence.setV(other.influence);
	}

	addInfluence(color) {
		this.influence.multWise(color);
	}
	
	copy() {
		const outp = new Ray(this.src, this.dir);
		outp.setBounds(this.min, this.max);
		return outp;
	}
	
	setMin(min) { this.min = Math.max(0, min); }
	setMax(max) { this.max = Math.max(this.min, max); }
	setBounds(min, max) {
		this.setMin(min);
		this.setMax(max);
	}
	
	setDepth(depth) {
		this.depth = depth;
	}
	
	resetBounds() {
		this.setBounds(1e-5, Infinity);
	}
	
	at(t, outV) {
		if(!(outV instanceof Vector3) || t < this.min || t > this.max) {
			return false;
		}
		
		outV.setV(this.dir).mult(t).add(this.src);
		return true;
	}
	
	toString() {
		return src.toString() + " " + dir.toString();
	}
}