import { PropertiesService } from "./properties.service.js";
import { ProvincesService } from "./provinces.service.js";
import { MapService } from "./map.service.js";
import { MyGeolocation } from "./my-geolocation.js";
// #region Services
const provincesService = new ProvincesService();
const propertiesService = new PropertiesService();

// #endregion

//#region DOM elements
const form = document.getElementById("property-form");
const provinceInput = document.getElementById("province");
const townInput = document.getElementById("town");
const addressInput = document.getElementById("address");
const titleInput = document.getElementById("title");
const sqmetersInput = document.getElementById("sqmeters");
const numRoomsInput = document.getElementById("numRooms");
const numBathsInput = document.getElementById("numBaths");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const mainPhotoInput = document.getElementById("mainPhoto");
const imagePreview = document.getElementById("image-preview");
const mapContainer = document.getElementById("map");
// #endregion

//#region Populate provinces
const provincesList = await provincesService.getProvinces();
const townsListGlobal = [];
provincesList.forEach(async (p) => {
  let option = document.createElement("option");
  option.value = p.id;
  option.append(p.name);
  provinceInput.append(option);
  const towns = await provincesService.getTowns(p.id);
  townsListGlobal.push(...towns);
});
// #endregion

//#region Populate towns

provinceInput.addEventListener("change", async (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex];
  const townsList = await provincesService.getTowns(selectedOption.value);
  townInput.replaceChildren([]);
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a town";
  townInput.append(defaultOption);
  townsList.forEach((t) => {
    let option = document.createElement("option");
    option.value = t.id;
    option.append(t.name);
    townInput.append(option);
  });
});
// #endregion

// #region Map
const myGeolocation = await MyGeolocation.getLocation();
let mapServiceDefault = new MapService(myGeolocation, mapContainer);
const marker = mapServiceDefault.createMarker(myGeolocation);

townInput.addEventListener("change", (event) => {
  const townId = parseInt(event.target.value);
  console.log(townId);
  const town = townsListGlobal.find((t) => t.id === parseInt(townId));
  const coords = [town.longitude, town.latitude];
  mapServiceDefault.view.setCenter(coords);
  marker.getGeometry().setCoordinates(coords);
});
// #endregion

//#region Image preview
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
});

//#region Form validation
const validateForm = (formData) => {
  let valid = true;

  const mainPhoto = formData.get("mainPhoto");
  const title = formData.get("title");
  const town = formData.get("townId");
  const province = formData.get("province");
  const address = formData.get("address");
  const sqmeters = formData.get("sqmeters");
  const numRooms = formData.get("numRooms");
  const numBaths = formData.get("numBaths");
  const price = formData.get("price");
  const description = formData.get("description");

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

  //Description
  if (!description.trim()) {
    descriptionInput.setCustomValidity("La descripción no puede estar vacía");
    valid = false;
  } else {
    descriptionInput.setCustomValidity("");
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

//#region Form submit
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  if (!validateForm(formData)) {
    return;
  }

  //We take out "province", since we don't need it
  formData.delete("province");
  //Gotta transform mainPhoto to base64
  formData.set("mainPhoto", await imgToBase64(formData.get("mainPhoto")));

  const newProperty = formDataToJSON(formData);
  console.log(newProperty);

  propertiesService.insertProperty(newProperty);

  window.location.href = "index.html";
});

//#region Utilities
const imgToBase64 = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const formDataToJSON = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    //We need to transform these to numbers
    if (["price", "townId", "sqmeters", "numRooms", "numBaths"].includes(key)) {
      object[key] = parseFloat(value);
    } else {
      object[key] = value;
    }
  });
  //We don't need to stringify the object since we do it in our http class methods
  return object;
};
