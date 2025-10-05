//  New property form
//  You'll see in the HTML file there's a form. This form will add a new Property 
// with this data:
//  • province →Required (in the future we'll get them from a server)
//  • town →Required (in the future we'll get them from a server)
//  • address → Required 
// • title → Required (only letters, numbers or spaces and begin with a capital letter)
//  • square meters → At least 1
//  • rooms → Between 1 and 20
//  • baths → Between 1 and 20
//  • price → At least €1
//  • image → Required (must be an image and less than 200kb)
//  When you select an image, it will show a preview inside the 
// img#imagePreview element. In order to do that, transform the image to 
// base64 format and put that in the src attribute.
//  The img#imgPreview element has a CSS class “hidden” which hides it. 
// When the image is showing but the src attribute is empty or not correct, it will 
// display a broken image icon in many browsers. You should remove this class 
// before assigning the base64 image to this element, and add it again when the 
// selected file is not correct.
//  Also, using the Constraint Validation API, verify that the selected file is an 
// image (check that file.type starts with “image”), and it doesn’t weight more 
// than 200KB. Show error messages in the field if that happens.
//  Arturo Bernal / Rosa Medina
//  2025/2026
//  Page: 3
// Submitting the form
//  When the user submits the form, do the following:
//  • Validate the form using the Constraint Validation API. If it’s not valid, don't continue.
//  • If everything is correct, add the new property to the HTML document, and reset the 
// form (also hide the preview image).
//  ◦ Use the template present in the HTML file (remember to clone it) and fill it with 
// the form’s data.  Do this in a separate function.
//  ◦ Create an object with all the property’s data and pass it to the function 
// mentioned above.
//  ◦ Transform the price to currency (in € and english) using the Intl API.
//  ◦ Append the card to the DOM (inside the div#property-listings container).
//  ◦ Add the click event to the delete button inside the card (button.btn-delete). When 
// this button is clicked, it will remove the card from the DOM.

const form = document.getElementById("property-form");

const provinceInput = document.getElementById("province");
const townInput = document.getElementById("town");
const addressInput = document.getElementById("address");
const titleInput = document.getElementById("title");
const sqmetersInput = document.getElementById("sqmeters");
const numRoomsInput = document.getElementById("numRooms");
const numBathsInput = document.getElementById("numBaths");
const priceInput = document.getElementById("price");

const propertyListings = document.getElementById("property-listings");


const mainPhotoInput = document.getElementById("mainPhoto");
const imagePreview = document.getElementById("image-preview");

const imgTemplate = document.getElementById("property-card-template");


mainPhotoInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
        return;
    }
    if (!file.type.startsWith("image")) {
        mainPhotoInput.setCustomValidity("El archivo debe ser de tipo imagen");
    } else if (file.size > 200000) {
        mainPhotoInput.setCustomValidity("El tamaño de la imagen no puede ser superior a 200KB");
    } else {
        mainPhotoInput.setCustomValidity("");
    }

    const base64Img = await imgToBase64(file);
    imagePreview.src = base64Img;
    imagePreview.classList.remove("hidden");
})

const imgToBase64 = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}

const createClone = async (formData) => {
    const clone = imgTemplate.content.cloneNode(true);
    clone.querySelector(".property-image").src = await imgToBase64(formData.get("mainPhoto"));
    clone.querySelector(".property-title").textContent = formData.get("title");
    clone.querySelector(".property-location").textContent = `${formData.get("town")}, ${formData.get("province")} \n ${formData.get("address")}`;
    clone.querySelector(".property-sqmeters").textContent = `${formData.get("sqmeters")} square meters`;
    clone.querySelector(".property-rooms").textContent = `${formData.get("numRooms")} rooms`;
    clone.querySelector(".property-baths").textContent = `${formData.get("numBaths")} bathrooms`;

    const currencyFormat = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "EUR"
    }).format(formData.get("price"));


    clone.querySelector(".property-price").textContent = currencyFormat;

    clone.querySelector(".btn-delete").addEventListener("click", (event) => {
        event.target.parentNode.parentNode.remove();
    });

    return clone;
}

const validateForm = (formData) => {
    let valid = true;

    const mainPhoto = formData.get("mainPhoto");
    const title = formData.get("title");
    const town = formData.get("town");
    const province = formData.get("province");
    const address = formData.get("address");
    const sqmeters = formData.get("sqmeters");
    const numRooms = formData.get("numRooms");
    const numBaths = formData.get("numBaths");
    const price = formData.get("price");

    // Town
    if (!town.trim()) {
        townInput.setCustomValidity("La ciudad no puede estar vacía");
        valid = false;
    } else {
        townInput.setCustomValidity("");
    }

    // Province
    if (!province.trim()) {
        provinceInput.setCustomValidity("La provincia no puede estar vacía");
        valid = false;
    } else {
        provinceInput.setCustomValidity("");
    }

    // Address
    if (!address.trim()) {
        addressInput.setCustomValidity("La dirección no puede estar vacía");
        valid = false;
    } else {
        addressInput.setCustomValidity("");
    }

    // Title
    const pattern = /^[A-Z][A-Za-z0-9 ]*$/;
    if (!title.trim()) {
        titleInput.setCustomValidity("El título no puede estar vacío");
        valid = false;
    } else if (!pattern.test(title)) {
        titleInput.setCustomValidity("Debe empezar por mayúscula y solo contener letras, números o espacios");
        valid = false;
    } else {
        titleInput.setCustomValidity("");
    }

    // Square meters
    if (!sqmeters || isNaN(parseInt(sqmeters)) || parseInt(sqmeters) < 1) {
        sqmetersInput.setCustomValidity("Debe tener al menos 1 m²");
        valid = false;
    } else {
        sqmetersInput.setCustomValidity("");
    }

    // Rooms
    if (!numRooms || isNaN(parseInt(numRooms)) || parseInt(numRooms) < 1 || parseInt(numRooms) > 20) {
        numRoomsInput.setCustomValidity("Debe haber entre 1 y 20 habitaciones");
        valid = false;
    } else {
        numRoomsInput.setCustomValidity("");
    }

    // Baths
    if (!numBaths || isNaN(parseInt(numBaths)) || parseInt(numBaths) < 1 || parseInt(numBaths) > 20) {
        numBathsInput.setCustomValidity("Debe haber entre 1 y 20 baños");
        valid = false;
    } else {
        numBathsInput.setCustomValidity("");
    }

    // Price
    if (!price || isNaN(parseInt(price)) || parseInt(price) < 1) {
        priceInput.setCustomValidity("Debe tener un precio mínimo de 1€");
        valid = false;
    } else {
        priceInput.setCustomValidity("");
    }

    // Image
    if (!mainPhoto || !mainPhoto.type.startsWith("image")) {
        mainPhotoInput.setCustomValidity("Debes subir una imagen válida");
        valid = false;
    } else if (mainPhoto.size > 200000) {
        mainPhotoInput.setCustomValidity("El tamaño de la imagen no debe superar los 200KB");
        valid = false;
    } else {
        mainPhotoInput.setCustomValidity("");
    }

    return valid;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (!validateForm(formData)) return;

    formData.set("created", new Date().toISOString());

    const clone = await createClone(formData);
    propertyListings.append(clone);

    form.reset();
    if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
    }
});