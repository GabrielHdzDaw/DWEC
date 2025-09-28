//  Create a file mobile-robot.class.js with the class MobileRobot which will
// inherit from Robot and will have:
//  • An extra private attribute with the speed it reaches (speed) and its
// corresponding getter.
//  • A method move which will display the message (replace values):
// Moving model at speed km/h and will decrease the battery by 20%.
//  • A toString method that will display all the characteristics of the robot
// (including the robot type)
import { Robot } from "./robot.class.js";

export class MobileRobot extends Robot {
    #speed

    constructor(model, speed) {
        super(model);
        this.#speed = speed;
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
    }

    move() {
        console.log(`Moving ${this.model} at ${this.speed} km/h and will decrease the battery by 20%`);
        this.battery -= 20;
    }

    toString(){
        return `Robot type: ${this.constructor.name}, ${super.toString()} Speed: ${this.speed}`
    }

}