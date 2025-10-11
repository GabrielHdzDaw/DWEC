import { ProvincesService } from "./provinces.service";

const provincesService = new ProvincesService();
const porpertiesService = new porpertiesService();

const form = document.getElementById("property-form");

const provinceInput = document.getElementById("province");
const provincesList = await provincesService.getProvinces();
document.addEventListener("DOMContentLoaded", () => {
    provincesList.provinces.forEach(p => {
        let option = document.createElement("option");
        option.value = p.name;
        option.append(p.name);
        provinceInput.append(option);
    })

})


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

document.addEventListener("DOMContentLoaded", () => {

})

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
    clone.querySelector(".property-title").append(formData.get("title"));
    clone.querySelector(".property-location").append(`${formData.get("town")}, ${formData.get("province")} \n ${formData.get("address")}`);
    clone.querySelector(".property-sqmeters").append(`${formData.get("sqmeters")} square meters`);
    clone.querySelector(".property-rooms").append(`${formData.get("numRooms")} rooms`);
    clone.querySelector(".property-baths").append(`${formData.get("numBaths")} bathrooms`);

    const currencyFormat = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "EUR"
    }).format(formData.get("price"));


    clone.querySelector(".property-price").append(currencyFormat);

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