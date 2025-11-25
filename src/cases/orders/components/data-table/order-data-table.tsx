import { orderColumns } from "./order-columns";
import { useOrders } from "../../hooks/use-order";
import { useCustomers } from "@/cases/customers/hooks/use-customer";
import { DataTable } from "@/components/ui/data-table";

export function OrderDataTable() {
  const { data: customers } = useCustomers();
  const { data: orders, isLoading } = useOrders();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const customer = customers?.find((c) => c.userId === userId);

  const filteredOrders =
    orders?.filter((order) => {
      if (!customer) return false;

      if (typeof order.customer === "string") {
        return order.customer === customer.id;
      }

      return order.customer?.id === customer.id;
    }) ?? [];

  if (isLoading) {
    return <p className="text-gray-600 mt-4">Carregando pedidos...</p>;
  }

  if (filteredOrders.length === 0) {
    return <p className="text-gray-600 mt-4">Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="max-h-[45vh] overflow-y-auto border rounded-lg mt-10 p-2">
      <DataTable columns={orderColumns} data={filteredOrders} />
    </div>
  );
}
