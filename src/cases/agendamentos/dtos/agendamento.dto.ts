import type { CarDTO } from "@/cases/cars/dtos/cars.dto";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import type { EletroPostoDTO } from "@/cases/eletroposto/dtos/eletropostos.dto";

export type AgendamentoStatus =
  | "agendado"
  | "cancelado"
  | "concluido";

export interface AgendamentoDTO {
  id?: string;

  customer: CustomerDTO;
  eletroposto: EletroPostoDTO;
  car: CarDTO;

  data: string;
  horaInicio: string;
  horaFim: string;

  status: AgendamentoStatus;

  createdAt?: string;
}