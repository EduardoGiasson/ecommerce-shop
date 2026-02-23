import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  useCreateEletroPosto,
  useUpdateEletroPosto,
} from "../hooks/use-eletropostos";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";

type Props = {
  open: boolean;
  onClose: () => void;
  eletroposto?: EletroPostoDTO | null;
};

export function CreateEletroPostoDialog({
  open,
  onClose,
  eletroposto,
}: Props) {
  const { mutateAsync: create, isPending: creating } =
    useCreateEletroPosto();
  const { mutateAsync: update, isPending: updating } =
    useUpdateEletroPosto();

  const isEditing = !!eletroposto;
  const isSaving = creating || updating;

  const emptyForm = {
    name: "",
    description: "",
    imageUrl: "",
    active: true,
    brand: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (eletroposto) {
      setForm({
        name: eletroposto.name ?? "",
        description: eletroposto.description ?? "",
        imageUrl: eletroposto.imageUrl ?? "",
        active: eletroposto.active ?? true,
        brand: eletroposto.brand ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [eletroposto, open]);

  async function handleSave() {
    try {
      if (!form.name.trim()) {
        alert("Nome obrigatório");
        return;
      }

      const payload = {
        name: form.name.trim(),
        description: form.description?.trim() || undefined,
        imageUrl: form.imageUrl?.trim() || undefined,
        brand: form.brand?.trim() || undefined,
        active: Boolean(form.active),
      };

      if (isEditing && eletroposto?.id) {
        await update({
          id: eletroposto.id,
          ...payload,
        });
      } else {
        await create(payload);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar eletroposto");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isSaving && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Eletroposto" : "Novo Eletroposto"}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar o eletroposto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nome"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Textarea
            placeholder="Descrição"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Input
            placeholder="Marca"
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
          />

          <Input
            placeholder="Imagem URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <Switch
              checked={form.active}
              onCheckedChange={(v) =>
                setForm({ ...form, active: v })
              }
            />
            <Label>Ativo</Label>
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