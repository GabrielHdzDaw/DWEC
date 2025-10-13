import { PropertiesService } from "./properties.service.js";

const propertiesService = new PropertiesService();
const properties = await propertiesService.getProperties();

const propertyListingsContainer = document.getElementById("property-listings");
const propertyCardTemplate = document.getElementById("property-card-template");

const createClone = (p) => {
  const clone = propertyCardTemplate.content.cloneNode(true);
  clone.querySelectorAll("div")[0].dataset.id = p.id;
  clone.querySelector(".property-image").src = p.mainPhoto;
  clone.querySelector(".property-title").append(p.title);
  clone.querySelector(".property-location").append(`${p.town.name}, ${p.town.province.name}`);
  clone.querySelector(".property-description").append(p.description);
  clone.querySelector(".property-sqmeters").append(`${p.sqmeters} m²`);
  clone.querySelector(".property-rooms").append(`${p.numRooms} rooms`);
  clone.querySelector(".property-baths").append(`${p.numBaths} bathrooms`);

  const currencyFormat = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(p.price);
  clone.querySelector(".property-price").append(currencyFormat);

  clone.querySelector(".btn-delete").addEventListener("click", async (event) => {
    const propertyCard = event.target.closest("[data-id]");

    const deleted = await propertiesService.deleteProperty(propertyCard.dataset.id);
    if (deleted) {
      console.log(deleted);
    }
    event.target.parentNode.parentNode.remove();
  });
  return clone;
};

properties.properties.forEach((p) => {
  const clone = createClone(p);
  propertyListingsContainer.append(clone);
});
