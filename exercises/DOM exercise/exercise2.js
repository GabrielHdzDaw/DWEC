/*****
 * DOM - Exercise 2
 * DON'T USE innerHTML!!!!
 */



//  * When a user clicks on a div inside the div.container element, add or remove (toggle) the "selected" CSS class,
//  * but this time, ONLY 1 div can have the "selected" class activated (remove from other div elements if necessary)
const container = document.querySelector(".container");

container.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV") {
        container.querySelectorAll("div").forEach(div => {
            div.classList.remove("selected");
        })
        event.target.classList.contains("selected") ? event.target.classList.remove("selected") : event.target.classList.add("selected");
    }
})

const insertBeforeBtn = document.getElementById("insert-before");
const insertAfterBtn = document.getElementById("insert-after");
const replaceBtn = document.getElementById("replace");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");
const textInput = document.getElementById("text");

//  * The button#insert-before element will create a NEW div with the text in the input#text element 
//  * (don't forget the click event on the new div) before the selected div or at the beginning of 
//  * the div.container if none is selected

insertBeforeBtn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.textContent = textInput.value;
    const index = [...container.children].indexOf(container.querySelector(".selected"));
    console.log(index);
    if (index > -1) {
        container.insertBefore(newDiv, container.children[index]);
    } else {
        container.prepend(newDiv);
    }
});

//  * The button#insert-after element will do the same but add it AFTER the selected div or at the end
//  * of the div.container if none is selected

insertAfterBtn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.textContent = textInput.value;
    const index = [...container.children].indexOf(container.querySelector(".selected"));
    if (index > -1) {
        container.insertBefore(newDiv, container.children[index + 1]);
    } else {
        container.append(newDiv);
    }
});

//  * The button#replace elemente will create a NEW DIV with the corresponding text and replace the selected div
//  * with it. If none is selected do nothing.

replaceBtn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.textContent = textInput.value;
    const index = [...container.children].indexOf(container.querySelector(".selected"));
    if (index > -1) {
        container.removeChild(container.children[index]);
        container.insertBefore(newDiv, container.children[index]);
    }
});

//  The button#delete elemente will delete the selected div (do nothing if none is selected).

deleteBtn.addEventListener("click", () => {
    const selected = container.querySelector(".selected");
    if (selected) {
        selected.remove();
    }
});

// * The button#clear elemente will remove everything inside the div.container element.

clearBtn.addEventListener("click", () =>{
    [...container.children].forEach(div =>{
        div.remove();
    })
})