/*****
 * DOM - Exercise 1
 * 
 * When a user clicks on a div inside the div.container element, add or remove (toggle) the "selected" CSS class
 * The button#delete element will remove all selected divs from the DOM
 */

const divs = document.querySelectorAll("div");

divs.forEach(div => {
    div.addEventListener("click", () => {
        div.classList.contains("selected") ? div.classList.remove("selected") : div.classList.add("selected");
    });
})