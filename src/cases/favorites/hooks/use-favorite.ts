import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteService } from "../services/favorite.service";
import { toast } from "react-toastify";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useProducts } from "@/cases/products/hooks/use-product";
import type { FavoriteDTO } from "../dtos/favorite.dto";

export function useFavorites(customerId: string) {
  return useQuery<FavoriteDTO[]>({
    queryKey: ["favorites"],
    queryFn: () => FavoriteService.list(customerId),
    enabled: !!customerId,
  });
}

export function useToggleFavorite(customerId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (productId: string) =>
      FavoriteService.toggle(customerId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      toast.error(`Erro ao favoritar: ${error.message}`);
    },
  });
}

export function useFavoriteProducts() {
  const { customer } = useCurrentCustomer();
  const { data: favorites, isLoading: loadingFav } = useFavorites(
    customer?.id!
  );
  const { data: products, isLoading: loadingProd } = useProducts();

  const isLoading = loadingFav || loadingProd;
  const favoriteProducts =
    favorites && products
      ? products.filter((p) => favorites.some((f) => f.product.id === p.id))
      : [];

  return { favoriteProducts, isLoading };
}
