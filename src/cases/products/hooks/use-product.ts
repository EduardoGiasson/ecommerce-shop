import { useQuery } from "@tanstack/react-query";
import type { ProductDTO } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";

export function useProducts() {
  return useQuery<ProductDTO[]>({
    queryKey: ["products"],
    queryFn: ProductService.list,
  });
}

export function useProduct(id: string) {
  return useQuery<ProductDTO>({
    queryKey: ["product", id],
    queryFn: () => ProductService.getById(id),
    enabled: !!id,
  });
}
