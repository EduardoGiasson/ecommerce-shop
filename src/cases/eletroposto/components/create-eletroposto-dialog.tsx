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

export function CreateEletroPostoDialog({ open, onClose, eletroposto }: Props) {
  const { mutateAsync: create, isPending: creating } = useCreateEletroPosto();
  const { mutateAsync: update, isPending: updating } = useUpdateEletroPosto();

  const isEditing = !!eletroposto;
  const isSaving = creating || updating;

  const emptyForm = {
    name: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    imageUrl: "",
    potencia: "",
    active: true,
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (eletroposto) {
      setForm({
        name: eletroposto.name ?? "",
        cep: eletroposto.cep ?? "",
        rua: eletroposto.rua ?? "",
        numero: eletroposto.numero ?? "",
        bairro: eletroposto.bairro ?? "",
        cidade: eletroposto.cidade ?? "",
        imageUrl: eletroposto.imageUrl ?? "",
        potencia: eletroposto.potencia?.toString() ?? "",
        active: eletroposto.active ?? true,
      });
    } else {
      setForm(emptyForm);
    }
  }, [eletroposto, open]);

  async function buscarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
      }));
    } catch {
      alert("Erro ao buscar CEP");
    }
  }

  async function handleSave() {
    try {
      if (!form.name.trim()) {
        alert("Nome obrigatório");
        return;
      }

      if (
        !form.rua ||
        !form.numero ||
        !form.bairro ||
        !form.cidade ||
        !form.cep
      ) {
        alert("Preencha todos os campos de endereço");
        return;
      }

      if (!form.potencia) {
        alert("Potência obrigatória");
        return;
      }

      const payload = {
        name: form.name.trim(),
        cep: form.cep,
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        imageUrl: form.imageUrl?.trim() || undefined,
        potencia: Number(form.potencia),
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
            placeholder="Nome do eletroposto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => {
              const cep = e.target.value;

              if (!cep) {
                setForm({
                  ...form,
                  cep: "",
                  rua: "",
                  bairro: "",
                  cidade: "",
                });
                return;
              }

              setForm({ ...form, cep });
            }}
            onBlur={() => buscarCEP(form.cep)}
          />

          <Input
            placeholder="Rua"
            value={form.rua}
            onChange={(e) => setForm({ ...form, rua: e.target.value })}
          />

          <Input
            placeholder="Número"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />

          <Input
            placeholder="Bairro"
            value={form.bairro}
            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
          />

          <Input
            placeholder="Cidade"
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Potência (kW)"
            value={form.potencia}
            onChange={(e) => setForm({ ...form, potencia: e.target.value })}
          />

          <Input
            placeholder="URL da imagem"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <div className="flex items-center gap-2">
            <Switch
              checked={form.active}
              onCheckedChange={(v) => setForm({ ...form, active: v })}
            />
            <Label>Ativo</Label>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
