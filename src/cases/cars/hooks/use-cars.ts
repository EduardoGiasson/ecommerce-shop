import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CarDTO } from "../dtos/cars.dto";
import { CarService } from "../services/cars.service";
import { api } from "@/lib/axios";

// LISTAR TODOS
export function useCars() {
  return useQuery<CarDTO[]>({
    queryKey: ["cars"],
    queryFn: CarService.list,
  });
}

// BUSCAR POR ID
export function useCar(id: string) {
  return useQuery<CarDTO>({
    queryKey: ["car", id],
    queryFn: () => CarService.getById(id),
    enabled: !!id,
  });
}

// ✅ CRIAR CARRO
export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CarDTO, "id">) => CarService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (car: CarDTO) => {
      const { id, ...data } = car;

      const response = await api.put(`/cars/${id}`, data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
