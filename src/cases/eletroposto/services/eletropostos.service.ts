import { api } from "@/lib/axios";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";

const ENDPOINT = "/eletropostos";

export const EletroPostoService = {
  /* ================= LIST ALL (MAPA USER) ================= */

  async list(): Promise<EletroPostoDTO[]> {
    const { data } = await api.get(ENDPOINT);
    return data;
  },

  /* ================= LIST BY CUSTOMER (PAINEL CLIENTE) ================= */

  async listByCustomer(customerId: string): Promise<EletroPostoDTO[]> {
    const { data } = await api.get(`${ENDPOINT}/customer/${customerId}`);
    return data;
  },

  /* ================= CREATE ================= */

  async create(data: {
    name: string;
    endereco?: string;
    potencia?: number;
    imageUrl?: string;
    active?: boolean;
    customerId: string;
  }): Promise<EletroPostoDTO> {
    const { data: result } = await api.post(ENDPOINT, data);
    return result;
  },

  /* ================= UPDATE ================= */

  async update(
    id: string,
    data: {
      name?: string;
      endereco?: string;
      potencia?: number;
      imageUrl?: string;
      active?: boolean;
      customerId: string;
    }
  ): Promise<EletroPostoDTO> {
    const { data: result } = await api.put(`${ENDPOINT}/${id}`, data);
    return result;
  },

  /* ================= DELETE ================= */

  async remove(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};