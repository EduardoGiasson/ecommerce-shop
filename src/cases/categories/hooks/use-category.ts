import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../services/category.service";
import type { CategoryDTO } from "../dtos/category.dto";

export function useCategories() {
  return useQuery<CategoryDTO[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.list,
  });
}

export function useCategory(id: string) {
  return useQuery<CategoryDTO>({
    queryKey: ["category", id],
    queryFn: () => CategoryService.getById(id),
    enabled: !!id, //-> or Boolean(id),
  });
}
