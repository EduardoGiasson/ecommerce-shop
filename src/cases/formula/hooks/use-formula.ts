import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { TransacaoCreditosService } from "../services/formula.service";
import type { TransacaoCreditosDTO } from "../dtos/formula.dto";

/* ================= LIST ================= */

export function useTransacoesCreditos() {
  return useQuery({
    queryKey: ["transacoes-creditos"],

    queryFn: () => TransacaoCreditosService.list(),
  });
}

/* ================= FIND ================= */

export function useTransacaoCreditos(id?: string) {
  return useQuery({
    queryKey: ["transacao-creditos", id],

    queryFn: () => TransacaoCreditosService.findById(id as string),

    enabled: !!id,
  });
}

/* ================= CREATE ================= */

export function useCreateTransacaoCreditos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<TransacaoCreditosDTO, "id" | "criado_em">) =>
      TransacaoCreditosService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transacoes-creditos"],
      });

      toast.success("Transação criada com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao criar transação";

      toast.error(message);
    },
  });
}

/* ================= UPDATE ================= */

export function useUpdateTransacaoCreditos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: TransacaoCreditosDTO & {
      id: string;
    }) => TransacaoCreditosService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transacoes-creditos"],
      });

      toast.success("Transação atualizada com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao atualizar transação";

      toast.error(message);
    },
  });
}

/* ================= DELETE ================= */

export function useDeleteTransacaoCreditos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TransacaoCreditosService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transacoes-creditos"],
      });

      toast.success("Transação removida com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao remover transação";

      toast.error(message);
    },
  });
}
