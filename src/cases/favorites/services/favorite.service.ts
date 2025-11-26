import { api } from "../../../lib/axios";
import type { FavoriteDTO } from "../dtos/favorite.dto";
const _ENDPOINT = "/favorites";

export const FavoriteService = {
  async list(customerId: string): Promise<FavoriteDTO[]> {
    const result = await api.get(_ENDPOINT, {
      params: { customerId },
    });
    return result.data;
  },

  async toggle(customerId: string, productId: string): Promise<void> {
    await api.post(_ENDPOINT, {
      customerId,
      productId,
    });
  },
};
