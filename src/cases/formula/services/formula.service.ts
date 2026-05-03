import { api } from "@/lib/axios";
import type { FormulaDTO } from "../dtos/formula.dto";

const ENDPOINT = "/formula";

export const FormulaService = {

  /* ================= LIST ================= */

  async list(): Promise<FormulaDTO[]> {

    const { data } =
      await api.get(ENDPOINT);

    return data;
  },

  /* ================= FIND BY ID ================= */

  async findById(
    id: string,
  ): Promise<FormulaDTO> {

    const { data } =
      await api.get(
        `${ENDPOINT}/${id}`,
      );

    return data;
  },

  /* ================= CREATE ================= */

  async create(data: {

    energia_kwh: number;

    possui_painel_solar: boolean;

    fator_credito: number;

    valor_kwh: number;

    data_carregamento: string;

  }): Promise<FormulaDTO> {

    const { data: result } =
      await api.post(
        ENDPOINT,
        data,
      );

    return result;
  },

  /* ================= UPDATE ================= */

  async update(
    id: string,

    data: {

      energia_kwh?: number;

      possui_painel_solar?: boolean;

      fator_credito?: number;

      valor_kwh?: number;

      data_carregamento?: string;
    },

  ): Promise<FormulaDTO> {

    const { data: result } =
      await api.put(
        `${ENDPOINT}/${id}`,
        data,
      );

    return result;
  },

  /* ================= DELETE ================= */

  async remove(
    id: string,
  ): Promise<void> {

    await api.delete(
      `${ENDPOINT}/${id}`,
    );
  },
};