
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