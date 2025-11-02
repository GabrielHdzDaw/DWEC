import { Http } from "./http.class.js";
import { PROPERTIES_URL } from "./constants.js";


interface Property {
  id: number;
  title: string;

export class PropertiesService {
  #http = new Http();

  async getProperties() {
    const res = await this.#http.methodGET(PROPERTIES_URL);
    return res.properties;
  }

  async insertProperty(propertyObject) {
    const res = await this.#http.methodPOST(PROPERTIES_URL, propertyObject);
    return res;
  }

  async deleteProperty(propertyId) {
    return await this.#http.methodDELETE(`${PROPERTIES_URL}/${propertyId}`);
  }
}
