import { api } from "../../../lib/axios";
import type { CarDTO } from "../dtos/cars.dto";

const _ENDPOINT = "/cars";

export const CarService = {
  async list(): Promise<CarDTO[]> {
    const result = await api.get(_ENDPOINT);
    return result.data;
  },

  async getById(id: string): Promise<CarDTO> {
    const result = await api.get(`${_ENDPOINT}/${id}`);
    return result.data;
  },
};
