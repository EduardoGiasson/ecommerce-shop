import { useState } from "react";
import { AgendamentoDataTable } from "@/cases/agendamentos/components/agendamento-data-table";
import { AgendamentoDialog } from "@/cases/agendamentos/components/agendamento-dialog";
import type { AgendamentoDTO } from "@/cases/agendamentos/dtos/agendamento.dto";
import { useAgendamentos } from "@/cases/agendamentos/hooks/use-agendamento";
import { Plus } from "lucide-react";

export function AgendamentosPage() {
  const { data = [], isLoading } = useAgendamentos();

  const [selected, setSelected] = useState<AgendamentoDTO | null>(null);
  const [open, setOpen] = useState(false);

  function handleEdit(agendamento: AgendamentoDTO) {
    setSelected(agendamento);
    setOpen(true);
  }

  function handleCreate() {
    setSelected(null);
    setOpen(true);
  }

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

      <AgendamentoDataTable
        data={data}
        loading={isLoading}
        onEdit={handleEdit}
      />

      <AgendamentoDialog
        open={open}
        onClose={() => setOpen(false)}
        agendamento={selected}
      />
    </section>
  );
}
