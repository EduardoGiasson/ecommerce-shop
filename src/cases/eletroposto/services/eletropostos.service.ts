import { api } from "@/lib/axios";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";

const _ENDPOINT = "/eletropostos";

export const EletroPostoService = {
  async list(): Promise<EletroPostoDTO[]> {
    const { data } = await api.get(_ENDPOINT);
    return data;
  },

  async create(data: any): Promise<EletroPostoDTO> {
    const { data: result } = await api.post(_ENDPOINT, data);
    return result;
  },

  async update(id: string, data: any): Promise<EletroPostoDTO> {
    const { data: result } = await api.put(`${_ENDPOINT}/${id}`, data);
    return result;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${_ENDPOINT}/${id}`);
  },
};