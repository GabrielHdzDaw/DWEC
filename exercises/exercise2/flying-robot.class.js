//  Create a file flying-robot.class.js with the class FlyingRobot which will
// inherit from Robot and will have:
//  • An extra private attribute with the height it reaches (altitude) and its
// corresponding getter.
//  • A method fly which will display the message (replace values): Flying
// model to altitude meters and will decrease the battery by 50%.
//  • A toString method that will display all the characteristics of the robot
// (including the robot type)

import { Robot } from "./robot.class.js";

class FlyingRobot extends Robot {
    #height;

    constructor(model, height){
        super(model);
        this.#height = height;
    }

    get height(){
        return this.#height;
    }

    set height(height){
        this.#height = height;
    }

    fly(){
        console.log(`Flying ${super.model} to ${this.height} meters and will decrease the battery by 50%`);
    }

    toString(){
        return `Robot type: ${this.constructor.name}, ${super.toString()} Height: ${this.height}`;
    }
}