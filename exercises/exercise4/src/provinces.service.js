import { Http } from "./http.class.js";
import { SERVER_URL } from "./constants.js";

export class ProvincesService {
  #http = new Http();

  async getProvinces() {
    return await this.#http.methodGET(`${SERVER_URL}/provinces`);
  }
  async getTowns(idProvince) {
    return await this.#http.methodGET(
      `${SERVER_URL}/provinces/${idProvince}/towns`
    );
  }
}
