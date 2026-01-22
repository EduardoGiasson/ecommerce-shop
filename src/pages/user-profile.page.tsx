import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import { api } from "@/lib/axios";
import { OrderDataTable } from "@/cases/orders/components/data-table/order-data-table";
import logo from "@/assets/images/logo.png";
import { FaSignOutAlt } from "react-icons/fa";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Você saiu da conta.");
    navigate("/");
  };

  if (!customer) {
    return <p className="text-center mt-20">Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1800px] min-h-[900px] bg-[#d9f3f2] rounded-lg p-12 relative">

        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-gray-700 text-lg">
            ENERGIZA
          </span>
        </div>

        {/* Conteúdo */}
        <div className="mt-16 px-10">

          {/* Header com logout */}
         <div className="flex items-center gap-4 mb-10">
  <h2 className="text-3xl font-bold">
    Olá, {customer.name}!
  </h2>

  <button
    onClick={handleLogout}
    className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded transition"
    title="Sair"
  >
    <FaSignOutAlt size={16} />
  </button>
</div>



          {/* Dados do usuário */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h3 className="text-xl font-semibold mb-6">
              Seus dados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-lg">
              <div>
                <p className="font-semibold text-sm text-gray-600">Nome</p>
                <p>{customer.name}</p>
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-600">Endereço</p>
                <p>{customer.address || "Não informado"}</p>
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-600">CEP</p>
                <p>{customer.zipcode || "Não informado"}</p>
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-600">Cidade</p>
                <p>{customer.city?.name || "Não informado"}</p>
              </div>
            </div>
          </div>

          {/* Agendamentos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-6">
              Agendamentos
            </h3>

            <OrderDataTable />
          </div>

          {/* Botão Voltar */}
          <button
            onClick={() => navigate("/products")}
            className="fixed bottom-24 right-32 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded shadow-lg"
          >
            Voltar
          </button>

        </div>
      </div>
    </div>
  );
}
