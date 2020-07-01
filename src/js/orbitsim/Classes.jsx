import Earth from "./Classes/Earth.jsx";
import Ribbon from "./Classes/Ribbon.jsx";
import Climber from "./Classes/Climber.jsx";
import Payload from "./Classes/Payload.jsx";
import Orbit from "./Classes/Orbit.jsx";
import ImpactPosition from "./Classes/ImpactPosition.jsx";
import FrameTimer from "./Classes/FrameTimer.jsx";
import UI from "./Classes/UI.jsx";

/* Drawing methods implemented here so that the "business logic" is separate from "view logic" */

Earth.draw = function(p5) {
    p5.push();
    p5.scale(1, -1, 1); // Need to reinvert for the texture to be in correct direction
    p5.rotateZ(-Earth.rotation);

    // Rotate to orient the texture in correct direction
    p5.rotateZ(-p5.PI);
    p5.rotateX(-p5.PI / 2);
    
    p5.fill('lightgreen');
    p5.texture(Earth.IMAGE);

    p5.sphere(Earth.RADIUS);
//    p5.fill('red');
//    p5.box(Earth.RADIUS*2, Earth.RADIUS*0.5, Earth.RADIUS*0.5);
    
    p5.pop();
};

Ribbon.draw = function(p5, camera_pos, further_shorter) {
    p5.push();
    p5.rotateZ(Earth.rotation);
    p5.rotateZ(Ribbon.LONGITUDE);
    p5.rotateX(Ribbon.LATITUDE);

    // Make Ribbon wider if camera is too far from the ribbon
    let dist_to_bot = Ribbon.true_bottom.dist(camera_pos);
    let dist_to_top = Ribbon.true_top.dist(camera_pos);
    let max_dist = Math.max(dist_to_bot, dist_to_top) / 300000000; // Randomly found decent factor
    if(further_shorter)
        max_dist /= 10;

    let w = Ribbon.WIDTH * max_dist;

    p5.draw_wrapper(
        p5.createVector(0, (Ribbon.LENGTH + Earth.RADIUS) / 2, 0), // Center of ribbon box
        Ribbon.COLOR,
        () => p5.cylinder(w, Ribbon.LENGTH + Earth.RADIUS)
    );
    
    p5.draw_wrapper(
        p5.createVector(0, Earth.GEO_RADIUS, 0), // Center of GEO station sphere
        Ribbon.GEO_COLOR,
        () => p5.sphere(Ribbon.GEO_WIDTH)
    );
    
    p5.draw_wrapper(
        p5.createVector(0, Ribbon.LENGTH + Earth.RADIUS, 0), // Center of counterweight
        Ribbon.COUNTER_COLOR,
        () => p5.sphere(Ribbon.COUNTER_WIDTH)
    );

    p5.pop();
};

Climber.prototype.draw = function(p5) {
    p5.push();
    p5.rotateZ(Earth.rotation);
    p5.rotateZ(Ribbon.LONGITUDE);
    p5.rotateX(Ribbon.LATITUDE);
    
    p5.draw_wrapper(this.position, this.color, () => p5.box(Climber.SIZE));

    p5.pop();
};

Payload.prototype.draw = function(p5) {
    p5.push();
    if(this.impacted) {
        p5.rotateZ(Earth.rotation);
    } else if(this.contained) { // While in climber, same as Climber.draw
        p5.rotateZ(Earth.rotation);
        p5.rotateZ(Ribbon.LONGITUDE);
        p5.rotateX(Ribbon.LATITUDE);
    } else { // Instead,use euler angles
        p5.rotateZ(this.container.eulers.longitude);
        p5.rotateX(this.container.eulers.inclination);
        p5.rotateZ(this.container.eulers.argument);

        // Draw the orbit as little marks as long as we look from above
        if(!this.impacted && p5.getTracked() == null) {
            let l = this.container.marks.length * 2; // max size - half the payload
            this.container.marks.forEach((e, idx) =>
                p5.draw_wrapper(e, 'orange', () => p5.sphere(Payload.SIZE * idx / l))
            );
        }
    }

    p5.draw_wrapper(this.position, this.color, () => p5.sphere(this.impacted ? Payload.SIZE / 10 : Payload.SIZE));

    p5.pop();

    // Velocity
    /*
    if(!this.impacted && !this.contained && p5.getTracked() == null) {
        p5.draw_wrapper(this.true_position.copy().add(this.container.velocity.mult(500)), "orange", () => p5.sphere(this.impacted ? Payload.SIZE / 10 : Payload.SIZE));
        p5.draw_wrapper(this.true_position.copy().add(this.container.velocity.mult(1000)), "orange", () => p5.sphere(this.impacted ? Payload.SIZE / 10 : Payload.SIZE));
    }
    */

};

export {Earth, Ribbon, Climber, Payload, Orbit, ImpactPosition, FrameTimer, UI};