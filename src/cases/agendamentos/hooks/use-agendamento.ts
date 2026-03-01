import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AgendamentoDTO,
  AgendamentoStatus,
} from "../dtos/agendamento.dto";
import { AgendamentoService } from "../services/agendamento.service";

// ======================================================
// 🔹 TYPES
// ======================================================

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

// ======================================================
// 🔹 QUERIES
// ======================================================

// LISTAR TODOS
export function useAgendamentos() {
  return useQuery<AgendamentoDTO[]>({
    queryKey: ["agendamentos"],
    queryFn: AgendamentoService.list,
  });
}

// BUSCAR POR ID
export function useAgendamento(id: string) {
  return useQuery<AgendamentoDTO>({
    queryKey: ["agendamento", id],
    queryFn: () => AgendamentoService.getById(id),
    enabled: !!id,
  });
}

// ======================================================
// 🔹 MUTATIONS
// ======================================================

// CREATE
export function useCreateAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgendamentoDTO) =>
      AgendamentoService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agendamentos"],
      });
    },
  });
}

// UPDATE
export function useUpdateAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: { id: string } & UpdateAgendamentoDTO) =>
      AgendamentoService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agendamentos"],
      });

      queryClient.invalidateQueries({
        queryKey: ["agendamento", variables.id],
      });
    },
  });
}

// DELETE
export function useDeleteAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      AgendamentoService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agendamentos"],
      });
    },
  });
}