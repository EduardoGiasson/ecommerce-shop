import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface BrandDTO {
  id?: string;
  name: string;
}

export interface CarDTO {
  id?: string;
  name: string;
  description?: string;
  active: boolean;
  category: CategoryDTO;
  brand?: BrandDTO;
  imageUrl?: string;
}
