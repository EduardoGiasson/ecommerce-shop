import type { CustomerDTO } from "@/cases/customers/dtos/customer.js";
export interface EletroPostoDTO {
  id: string;
  name: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  potencia: number;
  imageUrl?: string;
  active: boolean;
  customer: CustomerDTO;
}
