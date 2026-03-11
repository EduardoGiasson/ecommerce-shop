import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CarDTO } from "../dtos/cars.dto";
import { CarService } from "../services/cars.service";
import { toast } from "react-toastify";

// LISTAR TODOS
export function useCars() {
  return useQuery<CarDTO[]>({
    queryKey: ["cars"],
    queryFn: CarService.list,
  });
}

// BUSCAR POR ID
export function useCar(id?: string) {
  return useQuery<CarDTO>({
    queryKey: ["car", id],
    queryFn: () => CarService.getById(id!),
    enabled: !!id,
  });
}

// CRIAR CARRO
export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CarDTO, "id">) => CarService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Carro criado com sucesso!");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erro ao criar carro";
      toast.error(message);
    },
  });
}

// ATUALIZAR CARRO
export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (car: CarDTO) => {
      const { id, ...data } = car;

      if (!id) {
        throw new Error("Car ID is required for update");
      }

      return CarService.update(id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Carro atualizado com sucesso!");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Erro ao atualizar carro";

      toast.error(message);
    },
  });
}

// EXCLUIR CARRO
export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CarService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Carro excluído com sucesso!");
    },

    onError: (error: any) => {
      const backendMessage = error?.response?.data?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error(
          "Não é possível excluir este carro pois existe um agendamento vinculado a ele.",
        );
      }
    },
  });
}
