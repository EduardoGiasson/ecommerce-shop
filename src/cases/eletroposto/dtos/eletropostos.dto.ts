import type { CustomerDTO } from "@/cases/customers/dtos/customer";

export interface EletroPostoDTO {
  id: string;
  name: string;
  endereco: string;
  potencia: number;
  imageUrl?: string;
  active: boolean;
  customer: CustomerDTO;
}