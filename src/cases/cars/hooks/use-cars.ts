import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CarDTO } from "../dtos/cars.dto";
import { CarService } from "../services/cars.service";

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
    mutationFn: (data: Omit<CarDTO, "id">) =>
      CarService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
