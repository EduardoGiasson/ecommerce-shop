import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EletroPostoService } from "../services/eletropostos.service";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { toast } from "react-toastify";

/* ================= LIST ================= */

export function useEletroPostos() {
  const { customer } = useCurrentCustomer();
  const customerId = customer?.id;

  return useQuery({
    queryKey: ["eletropostos", customerId],
    queryFn: () => EletroPostoService.listByCustomer(customerId as string),
    enabled: !!customerId,
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
        customerId: customer.id,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eletropostos", customer?.id],
      });

      toast.success("Eletroposto criado com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao criar eletroposto";

      toast.error(message);
    },
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
        customerId: customer.id,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eletropostos", customer?.id],
      });

      toast.success("Eletroposto atualizado com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao atualizar eletroposto";

      toast.error(message);
    },
  });
}

/* ================= DELETE ================= */

export function useDeleteEletroPosto() {
  const queryClient = useQueryClient();
  const { customer } = useCurrentCustomer();

  return useMutation({
    mutationFn: (id: string) => EletroPostoService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eletropostos", customer?.id],
      });

      toast.success("Eletroposto excluído com sucesso!");
    },

    onError: (error: any) => {
      const backendMessage = error?.response?.data?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error(
          "Não é possível excluir este eletroposto, pois esta vinculado em um agendamento!",
        );
      }
    },
  });
}
