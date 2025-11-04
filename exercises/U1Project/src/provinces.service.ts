import { Http } from "./http.class.ts";
import { PROVINCES_URL } from "./constants.ts";

export interface Province {
  id: number;
  name: string;
}

interface ProvincesResponse {
  provinces: Province[];
}

export interface Town {
  id: number;
  name: string;
}

interface TownsResponse {
  towns: Town[];
}

export class ProvincesService {
  #http = new Http();

  async getProvinces(): Promise<Province[]> {
    const res: ProvincesResponse =
      await this.#http.get<ProvincesResponse>(PROVINCES_URL);
    return res.provinces;
  }

  async getTowns(idProvince: number): Promise<Town[]> {
    const res: TownsResponse = await this.#http.get<TownsResponse>(
      `${PROVINCES_URL}/${idProvince}/towns`
    );
    return res.towns;
  }
}
