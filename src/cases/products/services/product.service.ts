import { api } from "../../../lib/axios";
import type { ProductDTO } from "../dtos/product.dto";

const _ENDPOINT = "/products";

export const ProductService = {
  async list(): Promise<ProductDTO[]> {
    const result = await api.get(_ENDPOINT);
    return result.data;
  },

  async getById(id: string): Promise<ProductDTO> {
    const result = await api.get(`${_ENDPOINT}/${id}`);
    return result.data;
  },
};
