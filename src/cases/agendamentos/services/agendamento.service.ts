import { api } from "@/lib/axios";
import type {
  AgendamentoDTO,
  AgendamentoStatus,
} from "../dtos/agendamento.dto";

export type CreateAgendamentoDTO = {
  eletropostoId: string;
  carId: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: AgendamentoStatus;
};

export type UpdateAgendamentoDTO = {
  eletropostoId?: string;
  carId?: string;
  data?: string;
  horaInicio?: string;
  horaFim?: string;
  status?: AgendamentoStatus;
};

const _ENDPOINT = "/agendamentos";

export const AgendamentoService = {
  async list(): Promise<AgendamentoDTO[]> {
    const result = await api.get(_ENDPOINT);
    return result.data;
  },

  async getById(id: string): Promise<AgendamentoDTO> {
    const result = await api.get(`${_ENDPOINT}/${id}`);
    return result.data;
  },

  async create(
    data: CreateAgendamentoDTO
  ): Promise<AgendamentoDTO> {
    const result = await api.post(_ENDPOINT, data);
    return result.data;
  },

  async update(
    id: string,
    data: UpdateAgendamentoDTO
  ): Promise<AgendamentoDTO> {
    const result = await api.put(`${_ENDPOINT}/${id}`, data);
    return result.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${_ENDPOINT}/${id}`);
  },
};