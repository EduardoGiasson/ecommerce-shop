import { api } from "@/lib/axios";
import type { TransacaoCreditosDTO } from "../dtos/formula.dto";

const ENDPOINT = "/transacoes-creditos";

export const TransacaoCreditosService = {
  /* ================= LIST ================= */

  async list(): Promise<TransacaoCreditosDTO[]> {
    const { data } = await api.get(ENDPOINT);

    return data;
  },

  /* ================= FIND BY ID ================= */

  async findById(id: string): Promise<TransacaoCreditosDTO> {
    const { data } = await api.get(`${ENDPOINT}/${id}`);

    return data;
  },

  /* ================= CREATE ================= */

  async create(data: {
    carteira: string;

    energia_consumida_kwh: number;

    possui_painel_solar: boolean;

    fator_credito: number;

    creditos_gerados: number;

    valor_kwh: number;

    valor_total: number;

    data_carregamento: string;

    hash_transacao: string;
  }): Promise<TransacaoCreditosDTO> {
    const { data: result } = await api.post(ENDPOINT, data);

    return result;
  },

  /* ================= UPDATE ================= */

  async update(
    id: string,

    data: {
      carteira?: string;

      energia_consumida_kwh?: number;

      possui_painel_solar?: boolean;

      fator_credito?: number;

      creditos_gerados?: number;

      valor_kwh?: number;

      valor_total?: number;

      data_carregamento?: string;

      hash_transacao?: string;
    },
  ): Promise<TransacaoCreditosDTO> {
    const { data: result } = await api.put(`${ENDPOINT}/${id}`, data);

    return result;
  },

  /* ================= DELETE ================= */

  async remove(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
