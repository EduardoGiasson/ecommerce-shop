import { useQuery } from "@tanstack/react-query";
import type { CarDTO } from "../dtos/cars.dto";
import { CarService } from "../services/cars.service";

export function useCars() {
  return useQuery<CarDTO[]>({
    queryKey: ["cars"],
    queryFn: CarService.list,
  });
}

export function useCar(id: string) {
  return useQuery<CarDTO>({
    queryKey: ["car", id],
    queryFn: () => CarService.getById(id),
    enabled: !!id,
  });
}
