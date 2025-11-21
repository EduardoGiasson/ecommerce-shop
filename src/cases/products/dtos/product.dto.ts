import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface BrandDTO {
  id?: string;
  name: string;
}

export interface ProductDTO {
  id?: string;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  category: CategoryDTO;
  brand?: BrandDTO;
}
