export default class Vector3 {
	constructor(x, y, z, saveMag) {
		if(typeof x === "undefined") {
			// Empty constructor - simple init.
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.saveMag = false;
		} else {
			this.set(x, y, z, saveMag);
		}
	}
	
	setSaving(b) {
		if(b) {
			this._saveMags();
		} else {
			this.saveMag = false;
		}
		
		return this;
	}
	
	setV(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.saveMag = v.saveMag;
		if(this.saveMag) {
			this._mag = v._mag;
			this._magSq = v._magSq;
		}
		
		return this;
	}
	
	set(x, y, z, saveMag) {
		if(x instanceof Vector3) {
			return this.set(x.x, x.y, x.z, x.saveMag);
		}
		else if(x instanceof Array) {
			return this.set(x[0], x[1], x[2], false);
		}
		
		// Set the values
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
		// Reset saveMag
		saveMag = (typeof saveMag === "boolean" ? saveMag : (this.saveMag || false));
		this.saveMag = false;
		if(saveMag) {
			this._saveMags();
		}
		
		return this;
	}
	
	_saveMags() {
		this.saveMag = false;
		this._magSq = this.magSq();
		this._mag = this.mag();
		this.saveMag = true;
	}
	
	copy() {
		return new Vector3().setV(this);
	}
	
	dot(other) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}
	
	magSq() {
		if(this.saveMag && typeof this._magSq !== "undefined") {
			return this._magSq;
		}
		return this.dot(this);
	}
	
	mag() {
		if(this.saveMag && typeof this._mag !== "undefined") {
			return this._mag;
		}
		return Math.sqrt(this.magSq());
	}
	
	setMag(m) {
		const mag = this.mag();
		this.saveMag = false;
		this.mult(m / mag);
		// Save mag from the given
		this.saveMag = true;
		this._mag = m;
		this._magSq = m * m;
		return this;
	}
	
	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		
		if(this.saveMag) {
			this._saveMags();
		}
		return this;
	}

	scaleAdd(v, t) {
		this.x += (v.x * t);
		this.y += (v.y * t);
		this.z += (v.z * t);
		
		if(this.saveMag) {
			this._saveMags();
		}
		return this;
	}
	
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		
		if(this.saveMag) {
			this._saveMags();
		}
		return this;
	}
	
	mult(v) {
		this.x *= v;
		this.y *= v;
		this.z *= v;
		if(this.saveMag) {
			this._magSq *= (v * v);
			this._mag *= v;
		}
		return this;
	}
	
	multWise(other) {
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
		if(this.saveMag) {
			this._saveMags();
		}
		return this;
	}
	
	div(v) {
		return this.mult(1/v);
	}
	
	normalize() {
		const mag = this.mag();
		this.saveMag = false;
		this.div(mag);
		this.saveMag = true;
		this._mag = 1;
		this._magSq = 1;
		
		return this;
	}
	
	reflect(n) {
		const dot = 2 * this.dot(n);
		return n.copy().mult(dot).sub(this);
	}
	
	cross(v) {
		const x = this.y * v.z - this.z * v.y;
		const y = this.z * v.x - this.x * v.z;
		const z = this.x * v.y - this.y * v.x;
		
		return new Vector3(x, y, z);
	}
}

Vector3.sub = function(v1, v2) {
	return v1.copy().sub(v2);
}

Vector3.mult = function(v, k) {
	return v.copy().mult(k);
}

