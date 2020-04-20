import Vector3 from "./Vector3.js";

export default class Ray {
	constructor(src, dir) {
		this.src = new Vector3();
		this.dir = new Vector3();
		this.set(src, dir);
		this.resetBounds();
		this.setIndex(1);
	}

	set(src, dir) {
		this.src.set(src);
		this.dir.set(dir);
		this.dir.normalize();
	}
	
	setOther(other) {
		this.src.setV(other.src);
		this.dir.setV(other.dir);
		this.setBounds(other.min, other.max);
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

	setIndex(index) {
		this.index = index;
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