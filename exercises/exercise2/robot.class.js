
// Part 2 
//  Create the file robot.class.js with the class Robot which will have:
//  • Two private attributes (model and battery) with their corresponding 
// getters. The setter property will have a setter that checks whether the 
// charge is between 0 and 100, or it will display an error and do nothing. 
// The constructor will always set the battery to 100 (the model receives 
// this).
//  • A charge method that will bring the battery to 100%.
export class Robot {
    #model;
    #battery;

    constructor(model) {
        this.model = model;
        this.#battery = 100;
    }

    get model() {
        return this.#model;
    }

    set model(model) {
        this.#model = model;
    }

    get battery() {
        return this.#battery;
    }

    set battery(charge) {
        if (charge >= 0 && charge <= 100) {
            this.#battery = charge;
        } else {
            throw new Error("Charge must be between 0 and 100");
        }
    }

    charge() {
        this.#battery = 100;
    }

    toString(){
        return `Model: ${this.model}, Battery: ${this.#battery}`;
    }
}


//  Create a file flying-robot.class.js with the class FlyingRobot which will
// inherit from Robot and will have:
//  • An extra private attribute with the height it reaches (altitude) and its
// corresponding getter.
//  • A method fly which will display the message (replace values): Flying
// model to altitude meters and will decrease the battery by 50%.
//  • A toString method that will display all the characteristics of the robot
// (including the robot type)
//  Finally create the file part2.js where we will implement the functionality of
// this section. Create an initial array of robots.
//  We are going to execute this section with node, so we'll take advantage of
// the built-in ability to read data from the console to interact with the user. To
// create the object that will read user input, we'll need the following code at the
// beginning and end of the file:
//  import * as readline from "node:readline/promises";
//  import { stdin as input, stdout as output } from "node:process";
//  const r1 = readline.createInterface({ input, output });
//  // The entire program
//  r1.close(); // Finally we close the input/output stream