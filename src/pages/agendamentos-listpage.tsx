import { useState } from "react";
import { AgendamentoDataTable } from "@/cases/agendamentos/components/agendamento-data-table";
import { AgendamentoDialog } from "@/cases/agendamentos/components/agendamento-dialog";
import type { AgendamentoDTO } from "@/cases/agendamentos/dtos/agendamento.dto";

import {
  useAgendamentos,
  useDeleteAgendamento,
} from "@/cases/agendamentos/hooks/use-agendamento";

import { useCars } from "@/cases/cars/hooks/use-cars";
import { useEletroPostos } from "@/cases/eletroposto/hooks/use-eletropostos";

import { Plus } from "lucide-react";

export function AgendamentosPage() {
  const { data = [], isLoading } = useAgendamentos();
  const deleteAgendamento = useDeleteAgendamento();

  const { data: cars } = useCars();
  const { data: eletropostos } = useEletroPostos();

  const [selected, setSelected] = useState<AgendamentoDTO | null>(null);
  const [open, setOpen] = useState(false);

  const [searchCliente, setSearchCliente] = useState("");
  const [carFilter, setCarFilter] = useState("");
  const [eletropostoFilter, setEletropostoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  function handleEdit(agendamento: AgendamentoDTO) {
    setSelected(agendamento);
    setOpen(true);
  }

  function handleCreate() {
    setSelected(null);
    setOpen(true);
  }

  function handleDelete(agendamento: AgendamentoDTO) {
    if (!agendamento.id) return;
    deleteAgendamento.mutate(agendamento.id);
  }

  const filteredData = data.filter((item) => {
    const cliente = item.customer?.name?.toLowerCase() || "";

    const matchCliente = cliente.includes(searchCliente.toLowerCase());

    const matchCar = carFilter === "" || item.car?.id === carFilter;

    const matchEletroposto =
      eletropostoFilter === "" || item.eletroposto?.id === eletropostoFilter;

    const matchStatus = statusFilter === "" || item.status === statusFilter;

    return matchCliente && matchCar && matchEletroposto && matchStatus;
  });

  return (
    <section className="min-h-screen bg-gray-200 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agendamentos</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <Plus size={18} />
          Novo Agendamento
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-4">
        {/* BUSCA CLIENTE */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchCliente}
          onChange={(e) => setSearchCliente(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64"
        />

        {/* CARRO */}
        <select
          value={carFilter}
          onChange={(e) => setCarFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-56"
        >
          <option value="">Todos os carros</option>
          {cars?.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>

        {/* ELETROPOSTO */}
        <select
          value={eletropostoFilter}
          onChange={(e) => setEletropostoFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-56"
        >
          <option value="">Todos eletropostos</option>
          {eletropostos?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-48"
        >
          <option value="">Todos status</option>
          <option value="agendado">Agendado</option>
          <option value="cancelado">Cancelado</option>
          <option value="concluido">Concluído</option>
        </select>
      </div>

      <AgendamentoDataTable
        data={filteredData}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AgendamentoDialog
        open={open}
        onClose={() => setOpen(false)}
        agendamento={selected}
      />
    </section>
  );
}
