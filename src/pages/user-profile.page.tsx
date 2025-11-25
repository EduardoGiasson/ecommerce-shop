import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import { api } from "@/lib/axios";
import { OrderDataTable } from "@/cases/orders/components/data-table/order-data-table";

export function UserProfilePage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);

  useEffect(() => {
    async function loadCustomer() {
      const stored = localStorage.getItem("user");

      if (!stored) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(stored);

      if (!user.id) {
        toast.error("Usuário inválido.");
        navigate("/login");
        return;
      }

      try {
        const { data: customers } = await api.get("/customers");
        const customerFound = customers.find(
          (c: CustomerDTO) => c.userId === user.id
        );

        if (!customerFound) {
          toast.error("Cliente não encontrado.");
          return;
        }

        setCustomer(customerFound);
      } catch (err) {
        toast.error("Erro ao carregar perfil.");
        console.error(err);
      }
    }

    loadCustomer();
  }, [navigate]);

  if (!customer) {
    return <p className="text-center mt-20">Carregando...</p>;
  }

  return (
    <div className="w-full px-10 py-10 relative min-h-screen">
      <h2 className="text-3xl font-bold mb-10">
        Olá, <span className="text-blue-600">{customer.name}</span>!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-lg">
        <div>
          <p className="font-semibold text-sm text-gray-700">Nome</p>
          <p>{customer.name}</p>
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-700">Endereço</p>
          <p>{customer.address || "Não informado"}</p>
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-700">CEP</p>
          <p>{customer.zipcode || "Não informado"}</p>
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-700">Cidade</p>
          <p>{customer.city?.name || "Não informado"}</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-12 mb-4">Pedidos</h3>
      <OrderDataTable />

      <button
        onClick={() => navigate("/products")}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded shadow-lg"
      >
        Cancelar
      </button>
    </div>
  );
}
