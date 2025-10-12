import { PropertiesService } from "./properties.service.js";

const propertiesService = new PropertiesService();
const properties = await propertiesService.getProperties();

const propertyListingsContainer = document.getElementById("property-listings");
const propertyCardTemplate = document.getElementById("property-card-template");

properties.properties.forEach((p) => {
  const clone = propertyCardTemplate.no

});


const createClone = async (formData) => {
  const clone = propertyCardTemplate.content.cloneNode(true);
  clone.querySelector(".property-image").src = await imgToBase64(
    formData.get("mainPhoto")
  );
  clone.querySelector(".property-title").append(formData.get("title"));
  clone
    .querySelector(".property-location")
    .append(
      `${formData.get("town")}, ${formData.get("province")} \n ${formData.get(
        "address"
      )}`
    );
  clone
    .querySelector(".property-sqmeters")
    .append(`${formData.get("sqmeters")} square meters`);
  clone
    .querySelector(".property-rooms")
    .append(`${formData.get("numRooms")} rooms`);
  clone
    .querySelector(".property-baths")
    .append(`${formData.get("numBaths")} bathrooms`);

  const currencyFormat = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(formData.get("price"));

  clone.querySelector(".property-price").append(currencyFormat);

  clone.querySelector(".btn-delete").addEventListener("click", (event) => {
    event.target.parentNode.parentNode.remove();
  });
  return clone;
};