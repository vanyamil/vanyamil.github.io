import {p5} from "../helpers.jsx";
import Earth from "./Earth.jsx";

export default class Ribbon {
    // Constants
    static get LENGTH() { return 100000000; }         // Length of the space tether, units : m
    static get WIDTH() { return 300000; }             // Width of the space tether, units : m. Not real value, instead one that is visible
    static get COLOR() { return 'lightgrey'; } 
    static get GEO_WIDTH() { return 500000; }        // Radius of the sphere indicating the geostationary station, units : m
    static get GEO_COLOR() { return '#6D5086'; } 
    static get COUNTER_WIDTH() { return 1000000; }    // Radius of the sphere indicating the counterweight, units : m
    static get COUNTER_COLOR() { return '#22339F'; }

    static get LONGITUDE() { return this._longitude; }
    static get LATITUDE() { return this._latitude; }

    static setLonLat(longitude, latitude) {
        const toRad = Math.PI / 180;
        this._longitude = toRad * (180 + longitude);
        this._latitude = toRad * latitude;
    }

    static true_vector(v) {
        return v.rotateX(this.LATITUDE).rotateZ(Earth.rotation).rotateZ(this.LONGITUDE);
    }

    static get true_bottom() {
        const v = p5.prototype.createVector(0, Earth.RADIUS, 0);
        return this.true_vector(v);
    }

    static get true_top() {
        const v = p5.prototype.createVector(0, Earth.RADIUS + this.LENGTH, 0);
        return this.true_vector(v);
    }
}

Ribbon.setLonLat(-69, 12.1);