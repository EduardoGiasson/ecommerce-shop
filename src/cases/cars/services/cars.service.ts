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

  async create(data: Omit<CarDTO, "id">): Promise<CarDTO> {
    const result = await api.post(_ENDPOINT, data);
    return result.data;
  },

  async update(id: string, data: Omit<CarDTO, "id">): Promise<CarDTO> {
    const result = await api.put(`${_ENDPOINT}/${id}`, data);
    return result.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${_ENDPOINT}/${id}`);
  },
};
