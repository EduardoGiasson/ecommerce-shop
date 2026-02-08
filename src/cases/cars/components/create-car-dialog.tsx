import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/cases/categories/hooks/use-category";
import { useCreateCar } from "../hooks/use-cars";

type CreateCarDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateCarDialog({ open, onClose }: CreateCarDialogProps) {
  const { data: categories, isLoading } = useCategories();
  const { mutateAsync: createCar, isPending } = useCreateCar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [active, setActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState("");

  async function handleSave() {
  if (!categoryId) {
    alert("Selecione uma categoria");
    return;
  }

  const selectedCategory = categories?.find(
    (cat) => cat.id === categoryId
  );

  if (!selectedCategory) {
    alert("Categoria inválida");
    return;
  }

  await createCar({
    name,
    description,
    imageUrl,
    active,
    category: {
      id: selectedCategory.id,
      name: selectedCategory.name,
    },
    brand: brand ? { name: brand } : undefined,
  });

  onClose();
}


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Carro</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Categoria</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-md border"
              disabled={isLoading}
            >
              <option value="">Selecione</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Marca</Label>
            <Input
              placeholder="Ex: Toyota"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div>
            <Label>Imagem (URL)</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={active} onCheckedChange={setActive} />
            <Label>Ativo</Label>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Salvando..." : "Salvar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
