import { useMutation, useQuery } from "@tanstack/react-query";
import type { CustomerDTO } from "../dtos/customer";
import { CustomerService } from "../services/customer.service";

export function useCustomers() {
  return useQuery<CustomerDTO[]>({
    queryKey: ["customers"],
    queryFn: CustomerService.list,
  });
}

export function useCustomer(id: string) {
  return useQuery<CustomerDTO>({
    queryKey: ["customers", id],
    queryFn: () => CustomerService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  return useMutation<CustomerDTO, Error, Omit<CustomerDTO, "id">>({
    mutationFn: (customer: Omit<CustomerDTO, "id">) =>
      CustomerService.create(customer),
  });
}
