import { useMutation, useQuery } from "@tanstack/react-query";
import type { CustomerDTO } from "../dtos/customer";
import { CustomerService } from "../services/customer.service";
import { useMemo } from "react";

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

export function useCurrentCustomer() {
  const { data: customers, ...rest } = useCustomers();

  const localUser = localStorage.getItem("user");
  const userId = localUser ? JSON.parse(localUser).id : null;

  const customer = useMemo(() => {
    if (!customers || !userId) return undefined;
    return customers.find((c) => c.userId === userId);
  }, [customers, userId]);

  return {
    customer,
    ...rest,
  };
}
