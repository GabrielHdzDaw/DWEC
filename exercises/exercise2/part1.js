import { users } from "./users.js";
// Section 1
//  Generate a new array containing the email and password details of the 
// three youngest administrators. Try to perform this operation without 
// generating any intermediate variables or constants (only the final result). 
// Except for sorting the array, use JavaScript's iterator operations (obtain an 
// iterator from the array).
//  Example of final result:
//  [
//  ]
//  { email: 'bob@example.com', password: 'secureBob' },
//  { email: 'sophia@example.com', password: 'sophiaSecure' },
//  { email: 'diana@example.com', password: 'D1ana#Admin_25' }



const threeYoungestAdministratorsEmails = users.filter(p => p.role = "admin").sort((p1, p2) => p1.age < p2.age).slice(0, 3).map(p => ({ email: p.email, password: p.password }));
console.log("Section 1.\n A new array containing the email and password details of the three youngest administrators.\n", threeYoungestAdministratorsEmails);

//  Section 2
//  Using iterators, obtain the names of the users who have access to PC1. 
// Separately, obtain the names of the users with access to PC9. Using set 
// methods, obtain the names of the users who have access to both PCs.
//  Display the three lists formatted with the JavaScript Internationalization 
// API (INTL) in English. The output should look like this:
//  PC1: Peter, Bob, Charlie, Henry, Liam, and Ryan
//  PC9: Charlie, Grace, Henry, Noah, and Ryan
//  PC1 y PC9: Charlie, Henry, and Ryan
const pc1 = []

const pc1Iterator = users.values();
for (let u of pc1Iterator) {
    if (u.authorizations.indexOf("PC1") !== -1) {
        pc1.push(u.name);
    }
}
console.log("\nSection 2");
console.log("PC1:", new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(pc1));

const pc9 = []

const pc9Iterator = users.values();
for (let u of pc9Iterator) {
    if (u.authorizations.indexOf("PC9") !== -1) {
        pc9.push(u.name);
    }
}

console.log("PC9:", new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(pc9));

console.log("PC1 and PC9:", new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(new Set(pc1).intersection(new Set(pc9))));

// Section 3
//  Generate an array of users with more or less secure passwords. To do so,
// they must meet the following requirements:
//  • Minimum length 5
//  • At least one lowercase
//  • At least one capital letter
//  • At least one number
//  • At least one non-alphanumeric character (letter or number)
//  Afterwards, keep only the username and password of the users who meet
// it.
//  Obtain an iterator from the users array and apply the operations described
// above to the iterator.
//  This is the content of the final array:
//  [
//  ]
//  'Alice -> P@ssw0rd123!',
//  'Diana -> D1ana#Admin_25',
//  'Henry -> H3nry!_Secur3',
//  'Liam -> L!am_P@ss_2025',
//  'Peter2 -> P3t3r2-S#cur3',
//  'Ryan -> Ry@n_Is_Str0ng!'

// We can do this
// const securePasswords = users.filter(u => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{5,}$/.test(u.password)).map(u => `${u.name} -> ${u.password}`);

//Or this (cleaner, readable)
const securePasswords = users.filter(u =>
    u.password.length > 5 &&
    /[a-z]/.test(u.password) &&
    /[A-Z]/.test(u.password) &&
    /\d/.test(u.password) &&
    /\W/.test(u.password)
).map(u => `${u.name} -> ${u.password}`);

console.log("\nSection 3");
securePasswords.forEach(p => {
    console.log(p);
})

//  Section 4
//  Using this function which returns a random integer from zero up to a
// maximum (excluding):
//  function getRandomInt(max) {
//  return Math.floor(Math.random() * max);
//  }
//  Get a user from the array at random and generate a new object with the
// same data as the user and an extra field called lastAccess with the date in a
// format like this (09/18/2025, 11:05:20)
//  Do not modify the original user! Use the operator spread. Print the user
// with the generated field and then print the original user to verify that it has not
// been modified.

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let randomInt = getRandomInt(users.length);
let newUser = { ...users[randomInt] };
newUser['lastAccess'] = new Date().toLocaleString();

console.log(newUser);
console.log(users[randomInt]);