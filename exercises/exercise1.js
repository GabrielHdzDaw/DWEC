/**
 * Part 1
 * Create a function that receives 2 strings. The second string must contain only a letter
 * It should return the number of times that letter (second parameter) is included in the string (first parameter).
 * It should not differentiate between uppercase and lowercase letters
 * Check that both parameters are strings and the second string is only 1 character. If there's an error, print a message and return -1
 * Example: timesChar("Characteristic", "c") -> 3
 */
console.log("EXERCISE 1 - PART 1");

function timesChar(string, letter) {
    if (typeof string != "string" || typeof letter != "string") {
        console.log("Parameters must be of type string.");
        return -1;
    }
    let counter = 0;
    for (l of string) {
        if (l === letter) {
            counter++;
        }
    }
    return counter;
}

console.log(timesChar(2, "e"));


/**
 * Part 2
 * Create a function that takes a string as input and checks if it's a palindrome (if it's the same when reversed).
 * Do this without using loops (hint: you can use Array.from to convert a string into an array).
 * Check that the type of the parameter is "string", and the lenght is at least 1 or show an error
 * Example: isPalindrome("abeceba") -> true
 */

console.log("\nEXERCISE 1 - PART 2");

function isPalindrome(string) {
    if (typeof string !== "string") {
        console.log("Parameter must be of type string.");
        return;
    }
    if (string.length < 1) {
        console.log("String must be at least 1 character long.");
        return;
    }
    return [...string].join("") === [...string].reverse().join("");
}

console.log(isPalindrome("abba"));


/**
 * Part 3
 * Create an array of strings.
 * Filter the array to include only the strings which their length is at least 5 characters
 * Transform all the strings in the filtered array to UPPERCASE
 * Print the resulting array, using ";" as the separator
 * Don't use traditional loops! (while, for, ...)
 */
console.log("\nEXERCISE 1 - PART 3");

let stringArray = ["Lentejas", "Patatas", "Fonemas", "Filigranas", "Casa", "Paz", "Telettubies"];
console.log(stringArray.filter(s => s.length >= 5).map(s => s.toUpperCase()).join(";"));


/**
 * Part 4
 * Develop a function that compresses a string by replacing consecutive repeating characters with
 * the character and the count of repetitions. For example, "AAAABBBCC" would become "4A3B2C".
 * Example: stringCompression("GGGHHRRRRRRRUIIIOOOO") -> 3G2H7R1U3I4O
 */

console.log("\nEXERCISE 1 - PART 4");

function stringCompression(string) {
    if (typeof string !== "string") {
        console.log("Parameter must be of type string.");
        return;
    }
    let compressedString = string[0];
    let count = 1;
    for (let i = 0; i < string.length; i++) {
        if (i > 0) {
            if (string[i] === string[i - 1]) {
                count++;
            } else {
                compressedString += count;
                count = 1;
                compressedString += string[i];
            }
        }
    }
    compressedString += count;
    compressedString += string[string.length - 1];
    return compressedString;
}

console.log(stringCompression("PAATATTTO"));

/**
 * Part 5
 * Create an array with 4 values and do the following (use the correct array methods).
 * Add 2 elements at the beginning
 * Add 2 more at the end.
 * Delete positions 3,4 and 5
 * Insert 2 elements before the last element.
 * On each change, show the resulting array with its elements separated by '=>' (don't use any loop).
 */
console.log("\nEXERCISE 1 - PART 5");

let array5 = ["ola", "manzana", "flamenco", "oscuro"];
console.log(array5.join("=>"));
array5.unshift("filigrana", "aguamarina");
console.log(array5.join("=>"));
array5.push("ornamento", "conglomerado");
console.log(array5.join("=>"));
array5.splice(2, 3);
console.log(array5.join("=>"));
array5.splice(array5.length - 1, 0, "playa", "gaviota");
console.log(array5.join("=>"));


/**
 * Part 6
 * Create a function that takes an array of numbers containing duplicate values. It should return the
 * first number that is repeated in the array, or -1 if there are no duplicates.
 * Do not use loops, and  if you don't know how to do it without loops, you can only use one loop
 * (.forEach counts as a loop).
 * Example: findFirstRepeated([1,4,7,3,8,4,5,5,1]) -> 4
 */

console.log("\nEXERCISE 1 - PART 6");

function findFirstRepeated(array) {

}

/**
 * Part 7
 * Create an array with several strings. Using the reduce method, return a string
 * that is a concatenation of the first letter of every string in the array.
 */

console.log("\nEXERCISE 1 - PART 7");

let array7 = [
    "gorilas",
    "arboreda",
    "belladona",
    "radiología",
    "iglú",
    "elefante",
    "libélula", " ",
    "retícula",
    "ultravioleta",
    "lentejas",
    "estofado",
    "sandía"
];

console.log(array7.reduce((res, s) => res + s[0], ""));


/**
 * Part 8
 * Create a function that takes an array of strings as the first parameter and a string as the second.
 * It should return a new array containing the words from the first array whose letters are all present
 * in the second string. Try not to use loops.
 * Example: filterWords(["house", "car", "watch", "table"], "catboulerham") -> ['car', 'table']
 */

console.log("\nEXERCISE 1 - PART 8");

function filterWords(array, string){
    return array.filter(s => [...s].every(char => string.includes(char)));
}

console.log(filterWords(["house", "car", "watch", "table"], "catboulerham"));

/**
 * Part 9
 * Create a function that takes an array of lights represented by the characters '🔴' and '🟢'.
 * The function should check if the lights are alternating (e.g., ['🔴', '🟢', '🔴', '🟢', '🔴']).
 * Return the minimum number of lights that need to be changed to make the lights alternate.
 * Example: adjustLights(['🔴', '🔴', '🟢', '🔴', '🟢'])  -> 1 (change the first light to green)
 */
console.log("\nEXERCISE 1 - PART 9");

function adjustLights(array){
    
}

/**
 * Part 10
 * Create a Map object. The key will be a student name, and the value an array with all his/her exam marks.
 * Iterate through the Map and show each student's name, the marks separated by '-' and the average mark (with 2 decimals).
 * Example: Peter (7.60 - 2.50 - 6.25 - 9.00). Average: 6.34
 */
console.log("\nEXERCISE 1 - PART 10");

/**
 * Part 11
 * Create a Map collection where the key is the name of a dish and the value is an array of ingredients.
 * From this Map, generate another Map where the key is the ingredient name and the value is an array of
 * dishes where that ingredient appears.
 */
console.log("\nEXERCISE 1 - PART 11");

/**
 * Part 12
 * Create a funcion that can receive as many numbers as you want by parameter. Use rest to group them in
 * an array and print the ones that are even and the ones that arre odd separately.
 * DON'T use loops (for, while, etc.)
 */
console.log("\nEXERCISE 1 - PART 12");


/**
 * Part 13
 * Create a function that receives an array and adds the first three numbers of the array.
 * Use array destructuring in the parameters to get those three numbers.
 * If any of those numbers is not present in the array, a default value of 0 will be assigned
 * Return the result of adding those three numbers
 */

console.log("\nEXERCISE 1 - PART 13");


/**
 * Part 14
 * Create a function that takes an indeterminate number of strings as arguments,
 * groups them into an array, and returns a new array containing the length of each string.
 * Do not use loops.
 * Example: getStringLengths("potato", "milk", "car", "table") -> [6, 4, 3, 5]
 */

console.log("\nEXERCISE 1 - PART 14");

/**
 * Part 15
 * Create an array, and without modifying it, generate the following derived arrays (each new array derives from the previous one):
 * - Add 2 elements to the beginning of the array
 * - Delete positions 4 and 5
 * - Concatenate the elements of another array to the end Show the resulting array after each operation.
 *
 * No operation performed should modify the array on which it operates. Show the original array at the end.
 */

console.log("\nEXERCISE 1 - PART 15");



