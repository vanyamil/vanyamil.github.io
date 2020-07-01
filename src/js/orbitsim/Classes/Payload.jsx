import ImpactPosition from "./ImpactPosition.jsx";
import Orbit from "./Orbit.jsx";

export default class Payload {    
    // Constants
    static get ACTIVE_COLOR() { return 'yellow'; }
    static get INACTIVE_COLOR() { return 'cyan'; }
    static get IMPACT_COLOR() { return '#ff8d00'; }
    static get SIZE() { return 700000; }                // Size of the payload sphere, units : m, not real value
    
    // Constructor
    constructor(climber) {
        this.container = climber;
        this.active = true;
        this.contained = true;
        this.impacted = false;
    }
    
    get position() { return this.container.position; }
    get true_position() { return this.container.true_position; }
    get color() { return this.impacted ? Payload.IMPACT_COLOR : this.active ? Payload.ACTIVE_COLOR : Payload.INACTIVE_COLOR; }

    // Update only the orbit, since climbers get updated on their own.
    update(timer) {
        if(!this.contained && !this.impacted) {
            this.container.update(timer);

            if(this.container.altitude < 0) {
                this.impacted = true;

                // Extract the long/lat and change container to "ImpactPosition"?
                this.container = new ImpactPosition(this.container);
            }
        }
    }

    boost(v, addOrSet, curTime) {
        // Only allowed in flight
        if(this.impacted || this.contained) {
            console.log("Cannot boost");
            return;
        }

        const fwd = this.container.velocity;
        console.log("Old v: " + fwd);
        console.log("Old pos: " + this.true_position);

        const speed = fwd.mag();
        fwd.normalize();

        const normal = this.container.momentum.copy().normalize();
        const tangent = fwd.cross(normal);

        if(!addOrSet) // add move
            v.x += speed;

        // x is forward, y is tangent, z is normal - need to transform to world coords
        const moddedV = v.copy().mult(0);
        moddedV.scaleAdd(fwd, v.x);
        moddedV.scaleAdd(tangent, v.y);
        moddedV.scaleAdd(normal, v.z);
        console.log("New v: " + moddedV);

        this.container = new Orbit(this.true_position, moddedV, curTime);
        console.log("New pos: " + this.true_position);
        console.log("New epoch pos: " + this.container.epoch.pos);
    }
}