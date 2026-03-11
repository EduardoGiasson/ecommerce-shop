import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import type { CustomerDTO } from "@/cases/customers/dtos/customer";

export function UserProfilePage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          handleLogout();
          return;
        }

        const user = JSON.parse(storedUser);

        if (!user?.id) {
          toast.error("Usuário inválido.");
          handleLogout();
          return;
        }

        const { data: customers } = await api.get("/customers");

        const customerFound = customers.find(
          (c: CustomerDTO) => c.userId === user.id,
        );

        if (!customerFound) {
          toast.error("Cliente não encontrado.");
          return;
        }

        setCustomer(customerFound);
      } catch (error) {
        toast.error("Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [handleLogout]);

  if (loading) {
    return <p className="mt-20 text-center">Carregando...</p>;
  }

  if (!customer) {
    return <p className="mt-20 text-center">Perfil não encontrado.</p>;
  }

  return (
    <div className="relative min-h-screen w-full px-10 py-10">
      <div className="mb-10 flex items-center gap-4">
        <h2 className="text-3xl font-bold">Olá, {customer.name}!</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 text-lg md:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="Nome" value={customer.name} />
        <InfoItem label="Endereço" value={customer.address} />
        <InfoItem label="CEP" value={customer.zipcode} />
        <InfoItem label="Cidade" value={customer.city?.name} />
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value?: string | null;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p>{value || "Não informado"}</p>
    </div>
  );
}
