import Vector3 from "./Vector3.js";

export default class IntersectionResult {
    constructor() {
        this.material = null;
        this.p = new Vector3(0, 0, 0, true);
        this.n = new Vector3(1, 0, 0, true);
        this.reset();
    }
    
    setIntersection(t, p, n, m) {
        this.connects = true;
        this.t = t;
        this.p.setV(p);
        this.n.setV(n).normalize();
        this.material = m;
    }
    
    setOther(other) {
        this.setIntersection(other.t, other.p, other.n, other.material);
    }
    
    reset() {
        this.connects = false;
        this.t = Infinity;
    }
}