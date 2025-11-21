import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import type { OrderItemDTO } from "./order-item.dtos";

export const OrderStatus = [
  {
    value: "NEW",
    label: "Novo",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-300",
  },
  {
    value: "SEPARATION",
    label: "Em Separação",
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    border: "border-yellow-400",
  },
  {
    value: "INVOICED",
    label: "Faturado",
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-400",
  },
  {
    value: "SHIPPED",
    label: "Enviado",
    bg: "bg-teal-200",
    text: "text-teal-800",
    border: "border-teal-400",
  },
  {
    value: "DELIVERED",
    label: "Entregue",
    bg: "bg-green-200",
    text: "text-green-900",
    border: "border-green-400",
  },
  {
    value: "CANCELED",
    label: "Cancelado",
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-300",
  },
];

export interface OrderDTO {
  id?: string;
  customer: CustomerDTO | string;
  status: string;
  total: number;
  shipping: number;
  items?: OrderItemDTO[];
  createdAt?: Date;
  updatedAt?: Date;
}
