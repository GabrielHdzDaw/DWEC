import { Http } from "./http.class.js";
import { SERVER_URL } from "./constants.js";

export class PropertiesService {
  #http = new Http();

  async getProperties() {
    const res = await this.#http.methodGET(`${SERVER_URL}/properties`);
    return res.properties;
  }

  async insertProperty(propertyObject) {
    const res = await this.#http.methodPOST(`${SERVER_URL}/properties`, propertyObject);
    return res;
  }

  async deleteProperty(propertyId) {
    return await this.#http.methodDELETE(`${SERVER_URL}/properties/${propertyId}`);
  }
}
