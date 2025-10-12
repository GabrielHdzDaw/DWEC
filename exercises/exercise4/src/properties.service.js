import { Http } from "./http.class.js";
import { SERVER_URL } from "./constants.js";

export class PropertiesService {
  #http = new Http();

  async getProperties() {
    return await this.#http.methodGET(`${SERVER_URL}/properties`);
  }

  async insertProperty(propertyObject) {
    return await this.#http.methodPOST(
      `${SERVER_URL}/properties`,
      propertyObject
    );
  }

  async deleteProperty(propertyId) {
    return await this.#http.methodDELETE(
      `${SERVER_URL}/properties/${propertyId}`
    );
  }
}
