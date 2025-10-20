import { Http } from "./http.class.js";
import { PROVINCES_URL } from "./constants.js";

export class ProvincesService {
  #http = new Http();

  async getProvinces() {
    const res = await this.#http.methodGET(PROVINCES_URL);
    return res.provinces;
  }
  async getTowns(idProvince) {
    const res = await this.#http.methodGET(`${ PROVINCES_URL }/${idProvince}/towns`);
    return res.towns;
  }
}
