import { PropertiesService } from "./properties.service.ts";
// import type { Property } from "./properties.service.ts";
import { ProvincesService } from "./provinces.service.ts";
import type { Province, Town } from "./provinces.service.ts";
import { MapService } from "./map.service.ts";
import { MyGeolocation } from "./my-geolocation.ts";
// #region Services
const provincesService = new ProvincesService();
const propertiesService = new PropertiesService();

// #endregion

//#region DOM elements
const form = document.getElementById("property-form")! as HTMLFormElement;
const provinceInput = document.getElementById("province")! as HTMLSelectElement;
const townInput = document.getElementById("town")! as HTMLSelectElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const titleInput = document.getElementById("title")! as HTMLInputElement;
const sqmetersInput = document.getElementById("sqmeters")! as HTMLInputElement;
const numRoomsInput = document.getElementById("numRooms")! as HTMLInputElement;
const numBathsInput = document.getElementById("numBaths")! as HTMLInputElement;
const priceInput = document.getElementById("price")! as HTMLInputElement;
const descriptionInput = document.getElementById("description")! as HTMLInputElement;
const mainPhotoInput = document.getElementById("mainPhoto")! as HTMLImageElement;
const imagePreview = document.getElementById("image-preview")! as HTMLImageElement;
const mapContainer = document.getElementById("map")! as HTMLDivElement;
// #endregion

//#region Populate provinces
const provincesList: Province[] = await provincesService.getProvinces();
const townsListGlobal: Town[] = [];
provincesList.forEach(async p => {
  const option: HTMLOptionElement = document.createElement("option");
  option.value = p.id.toString();
  option.append(p.name);
  provinceInput?.append(option);
  const towns: Town[] = await provincesService.getTowns(p.id);
  townsListGlobal.push(...towns);
});
// #endregion

//#region Populate towns

provinceInput.addEventListener("change", async e => {
  const selectedOption = (e.target as HTMLSelectElement).options[(e.target as HTMLSelectElement).selectedIndex];
  const townsList = await provincesService.getTowns(parseInt(selectedOption.value));
  townInput.replaceChildren();
  townsList.forEach(t => {
    const option: HTMLOptionElement = document.createElement("option");
    option.value = t.id.toString();
    option.append(t.name);
    townInput.append(option);
  });
});
// #endregion

// #region Map
const myGeolocation = await MyGeolocation.getLocation();
const mapServiceDefault = new MapService(myGeolocation, mapContainer);
mapServiceDefault.createMarker(myGeolocation);

townInput.addEventListener("change", event => {
  mapContainer.replaceChildren();
  const townId = parseInt(event.target.value);

  const town = townsListGlobal.find(t => t.id === parseInt(townId));
  const coords = { latitude: town.latitude, longitude: town.longitude };
  const mapService = new MapService(coords, mapContainer);
  mapService.createMarker(coords);
});
// #endregion

//#region Image preview
mainPhotoInput.addEventListener("change", async event => {
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
const validateForm = formData => {
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
form.addEventListener("submit", async event => {
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
const imgToBase64 = async file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const formDataToJSON = formData => {
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
