import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type {
  AgendamentoDTO,
  AgendamentoStatus,
} from "../dtos/agendamento.dto";

import {
  useCreateAgendamento,
  useUpdateAgendamento,
} from "../hooks/use-agendamento";

import { useEletroPostos } from "@/cases/eletroposto/hooks/use-eletropostos";
import { useCars } from "@/cases/cars/hooks/use-cars";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  agendamento?: AgendamentoDTO | null;
};

// 🔥 Novo tipo correto do formulário
type AgendamentoForm = {
  eletropostoId: string;
  carId: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: AgendamentoStatus;
};

export function AgendamentoDialog({ open, onClose, agendamento }: Props) {
  const { mutateAsync: create, isPending: creating } = useCreateAgendamento();

  const { mutateAsync: update, isPending: updating } = useUpdateAgendamento();

  const { data: eletropostos } = useEletroPostos();
  const { data: cars } = useCars();

  const isEditing = !!agendamento;
  const isSaving = creating || updating;

  const emptyForm: AgendamentoForm = {
    eletropostoId: "",
    carId: "",
    data: "",
    horaInicio: "",
    horaFim: "",
    status: "agendado",
  };

  const [form, setForm] = useState<AgendamentoForm>(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (agendamento) {
      setForm({
        eletropostoId: agendamento.eletroposto?.id ?? "",
        carId: agendamento.car?.id ?? "",
        data: agendamento.data,
        horaInicio: agendamento.horaInicio,
        horaFim: agendamento.horaFim,
        status: agendamento.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [agendamento, open]);

  async function handleSave() {
    try {
      if (
        !form.eletropostoId ||
        !form.carId ||
        !form.data ||
        !form.horaInicio ||
        !form.horaFim
      ) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }

      if (isEditing && agendamento?.id) {
        await update({
          id: agendamento.id,
          ...form,
        });

        toast.success("Agendamento atualizado com sucesso!");
      } else {
        await create(form);

        toast.success("Agendamento criado com sucesso!");
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar agendamento.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSaving && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Agendamento" : "Novo Agendamento"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* ELETROPOSTO */}
          <div>
            <Label>Eletroposto</Label>
            <select
              className="border rounded px-2 py-1 w-full"
              value={form.eletropostoId}
              onChange={(e) =>
                setForm({ ...form, eletropostoId: e.target.value })
              }
            >
              <option value="">Selecione</option>
              {eletropostos?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          {/* CARRO */}
          <div>
            <Label>Carro</Label>
            <select
              className="border rounded px-2 py-1 w-full"
              value={form.carId}
              onChange={(e) => setForm({ ...form, carId: e.target.value })}
            >
              <option value="">Selecione</option>
              {cars?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* DATA */}
          <div>
            <Label>Data</Label>
            <Input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </div>

          {/* HORA INÍCIO */}
          <div>
            <Label>Hora Início</Label>
            <Input
              type="time"
              value={form.horaInicio}
              onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
            />
          </div>

          {/* HORA FIM */}
          <div>
            <Label>Hora Fim</Label>
            <Input
              type="time"
              value={form.horaFim}
              onChange={(e) => setForm({ ...form, horaFim: e.target.value })}
            />
          </div>

          {/* STATUS */}
          <div>
            <Label>Status</Label>
            <select
              className="border rounded px-2 py-1 w-full"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as AgendamentoStatus,
                })
              }
            >
              <option value="agendado">Agendado</option>
              <option value="cancelado">Cancelado</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
