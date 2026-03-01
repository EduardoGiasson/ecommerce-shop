import { AgendamentoDataTable } from "@/cases/agendamentos/components/agendamento-data-table";
import { AgendamentoDialog } from "@/cases/agendamentos/components/agendamento-dialog";
import type { AgendamentoDTO } from "@/cases/agendamentos/dtos/agendamento.dto";
import { useAgendamentos } from "@/cases/agendamentos/hooks/use-agendamento";
import { useState } from "react";

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
    <section className="flex flex-col gap-6 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agendamentos</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
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