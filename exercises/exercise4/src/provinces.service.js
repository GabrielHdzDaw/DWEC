import { Http } from "./http.class.js";
import { SERVER_URL } from "./constants.js";

export class ProvincesService {
  #http = new Http();

  async getProvinces() {
    const res = await this.#http.methodGET(`${SERVER_URL}/provinces`);
    return res.provinces;
  }
  async getTowns(idProvince) {
    const res = await this.#http.methodGET(`${SERVER_URL}/provinces/${idProvince}/towns`);
    return res.towns;
  }
}
