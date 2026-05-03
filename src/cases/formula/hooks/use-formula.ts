import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import { FormulaService } from "../services/formula.service";

import type { FormulaDTO } from "../dtos/formula.dto";

/* ================= LIST ================= */

export function useFormulas() {

  return useQuery({

    queryKey: ["formulas"],

    queryFn: () =>
      FormulaService.list(),
  });
}

/* ================= FIND ================= */

export function useFormula(
  id?: string,
) {

  return useQuery({

    queryKey: ["formula", id],

    queryFn: () =>
      FormulaService.findById(
        id as string,
      ),

    enabled: !!id,
  });
}

/* ================= CREATE ================= */

export function useCreateFormula() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: Omit<
        FormulaDTO,
        "id" |
        "creditos_gerados" |
        "valor_total" |
        "createdAt"
      >,
    ) =>

      FormulaService.create(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["formulas"],
      });

      toast.success(
        "Simulação criada com sucesso!",
      );
    },

    onError: (error: any) => {

      const message =

        error?.response?.data
          ?.message ||

        "Erro ao criar simulação";

      toast.error(message);
    },
  });
}

/* ================= UPDATE ================= */

export function useUpdateFormula() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      ...data
    }: FormulaDTO & {
      id: string;
    }) =>

      FormulaService.update(
        id,
        data,
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["formulas"],
      });

      toast.success(
        "Simulação atualizada com sucesso!",
      );
    },

    onError: (error: any) => {

      const message =

        error?.response?.data
          ?.message ||

        "Erro ao atualizar simulação";

      toast.error(message);
    },
  });
}

/* ================= DELETE ================= */

export function useDeleteFormula() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string,
    ) =>

      FormulaService.remove(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["formulas"],
      });

      toast.success(
        "Simulação removida com sucesso!",
      );
    },

    onError: (error: any) => {

      const message =

        error?.response?.data
          ?.message ||

        "Erro ao remover simulação";

      toast.error(message);
    },
  });
}