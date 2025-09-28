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
// / We'll show the user a menu until they choose the exit option (0). The menu 
// will look something like this:-------------------------------
// MENU-------------------------------
// 1) Show Mobile robots
//  2) Show flying robots
//  3) Create a robot
//  4) Move robots
//  5) Fly robots
//  6) Show robot info
//  0) Exit
//  To ask the user something and collect the answer we will use the following 
// instruction:
//  const resp = await r1.question("Something to ask for: ");
//  Important: Do not create functions where you read from the console since readline 
// works with promises and managing them with functions is something we have not seen yet (I 
// will explain what await means later).
//  Here's what each option will do:
//  1. It will only show the information (toString) of the mobile robots
//  2. It will only show information about flying robots.
//  3. It will create a robot by asking for the model, type of robot, and, 
// depending on the type, the value of its distinctive characteristic. We'll add 
// it to the array.
//  4. Call the method move() of the robots that have it (mobile). Don't 
// filter or check anything. Use the optional concatenation operator (?.).
//  5. Same as the previous one but with the method fly()
//  6. It will ask for a position in the array to display. It displays information 
// about the selected robot (toString) or the message "Robot not found at 
// position x" if there is no robot at that position. Don't use any kind of 
// checks such as if..else. Instead use the optional concatenation operator 
// (?.) and the null coalescence operator (??).
//  It's not enough that the results are what's required. The exercise MUST be 
// performed in compliance with the guidelines indicated in each section, or it 
// may be considered invalid. At the very least, you should try to comply with them 
// as much as possible.

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const r1 = readline.createInterface({ input, output });

import { FlyingRobot } from "./flying-robot.class.js";
import { MobileRobot } from "./mobile-robot.class.js";


const robots = [
    new FlyingRobot("Helicopter Paracopter", 230),
    new MobileRobot("Carro", 320),
    new MobileRobot("Joselito"),
    new MobileRobot("Neck Breaker"),
    new FlyingRobot("Doraemon", 500),
    new MobileRobot("¡Se mueve de verdad!", 123),
    new FlyingRobot("Avioneta", 125),
    new MobileRobot("Max 300", 300),
    new FlyingRobot("Mr Roboto"),
    new FlyingRobot("Flying José Luis", 1500),
    new MobileRobot("FiUM", 800),
    new MobileRobot("Mr Roboto", 12345),
];

const menu = `
------------------------------------
MENU
------------------------------------
1) Show Mobile robots
2) Show flying robots
3) Create a robot
4) Move robots
5) Fly robots
6) Show robot info
0) Exit
`;

let resp = "";
do {
    console.log(menu);
    resp = await r1.question("Input your selection: ");
    switch (resp) {
        case "1":
            console.log("\nShowing mobile robots: ");
            robots.filter(robot => robot.constructor.name === "MobileRobot").forEach(robot => {
                console.log(robot.toString());
            });
            break;
        case "2":
            console.log("\nShowing flying robots: ");
            robots.filter(robot => robot.constructor.name === "FlyingRobot").forEach(robot => {
                console.log(robot.toString());
            });
            break;
        case "3":
            let robotModel = await r1.question("Enter robot model: ");
            let robotType = await r1.question("Enter robot type: ");
            switch (robotType) {
                case "mobile":
                    let speed = await r1.question("Enter robot speed: ");
                    robots.push(new MobileRobot(robotModel, speed));
                    console.log("Robot added.");
                    break;
                case "flying":
                    let height = await r1.question("Enter robot height: ");
                    robots.push(new FlyingMobileRobot(robotModel, height));
                    console.log("Robot added.");
                    break;
                default:
                    console.log("Not a valid robot type.");
                    break;
            }
            break;
        case "4":
            robots.forEach(robot => robot.move?.())
            break;
        case "5":
            robots.forEach(robot => robot.fly?.())
            break;
        case "6":
            let position = await r1.question("Enter position: ");
            console.log(robots[position]?.toString() ?? "\nRobot not found at position", position);
            break;
        case "0":
            console.log("Bye bye!");
            break;
        default:
            console.log("Not a valid option.");
            break;
    }
} while (resp != 0);

r1.close();