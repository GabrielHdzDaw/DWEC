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

import { Robot } from "./robot.class.js";

const robots = [];

