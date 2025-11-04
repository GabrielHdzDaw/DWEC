import { Http } from "./http.class.ts";
import { PROPERTIES_URL } from "./constants.ts";

export interface Property {
  title: string;
  description: string;
  price: number;
  address: string;
  sqmeters: number;
  numRooms: number;
  numBaths: number;
  townId: number;
  mainPhoto: string;
}

interface getPropertiesResponse {
  properties: Property[];
}

export class PropertiesService {
  #http = new Http();

  async getProperties(): Promise<Property[]> {
    const res: getPropertiesResponse =
      await this.#http.get<getPropertiesResponse>(PROPERTIES_URL);
    return res.properties;
  }

  async insertProperty(propertyObject: Property): Promise<Property> {
    const res: Property = await this.#http.post<Property, Property>(
      PROPERTIES_URL,
      propertyObject
    );
    return res;
  }

  async deleteProperty(propertyId: number): Promise<Property> {
    return await this.#http.delete(`${PROPERTIES_URL}/${propertyId}`);
  }
}

const service: PropertiesService = new PropertiesService();

const properties: Property[] = await service.getProperties();

console.log(properties);