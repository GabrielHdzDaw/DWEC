import { Http } from "./http.class.js"
import { SERVER_URL } from "./constants.js";

class PropertiesService {
    #http = new Http();

    async getProperties() {
        return await this.#http.methodGET(`${SERVER_URL}/properties`);
    }

    async insertProperty(propertyObject) {
        return await this.#http.methodPOST(`${SERVER_URL}/properties`, propertyObject);
    }

    async deleteProperty(propertyId) {
        return await this.#http.methodDELETE(`${SERVER_URL}/properties/${propertyId}`);
    }
}

const service = new PropertiesService();
const properties = await service.getProperties();

const property = {
    title: "New Property",
    description: "Description\nOther line",
    price: 450000,
    address: "Calle patata 15",
    sqmeters: 140,
    numRooms: 5,
    numBaths: 3,
    townId: 1010164,
    mainPhoto: "Image in base64"
}

