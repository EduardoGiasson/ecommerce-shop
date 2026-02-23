import type { CustomerDTO } from "@/cases/customers/dtos/customer";

export interface EletroPostoDTO {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
  brand?: string;

  customer: CustomerDTO; // vem do backend
}