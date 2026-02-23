import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EletroPostoService } from "../services/eletropostos.service";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";

/* ================= LIST ================= */

export function useEletroPostos() {
  const { customer } = useCurrentCustomer();

  return useQuery({
    queryKey: ["eletropostos", customer?.id],
    queryFn: () => EletroPostoService.list(),
    enabled: !!customer?.id,
  });
}

/* ================= CREATE ================= */

export function useCreateEletroPosto() {
  const queryClient = useQueryClient();
  const { customer } = useCurrentCustomer();

  return useMutation({
    mutationFn: (data: Omit<EletroPostoDTO, "id" | "customer">) => {
      if (!customer?.id) {
        throw new Error("Usuário não logado");
      }

      return EletroPostoService.create({
        ...data,
        customerId: customer.id, // 🔥 EXATAMENTE O QUE O BACK ESPERA
      });
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["eletropostos"],
      }),
  });
}

/* ================= UPDATE ================= */

export function useUpdateEletroPosto() {
  const queryClient = useQueryClient();
  const { customer } = useCurrentCustomer();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: Omit<EletroPostoDTO, "customer"> & { id: string }) => {
      if (!customer?.id) {
        throw new Error("Usuário não logado");
      }

      return EletroPostoService.update(id, {
        ...data,
        customerId: customer.id, // 🔥 EXATAMENTE O QUE O BACK ESPERA
      });
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["eletropostos"],
      }),
  });
}

/* ================= DELETE ================= */

export function useDeleteEletroPosto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => EletroPostoService.remove(id),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["eletropostos"],
      }),
  });
}