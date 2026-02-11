import { useEffect, useState } from "react";
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
import { useCreateCar, useUpdateCar } from "../hooks/use-cars";
import type { CarDTO } from "../dtos/cars.dto";

type CreateCarDialogProps = {
  open: boolean;
  onClose: () => void;
  car?: CarDTO | null;
};

export function CreateCarDialog({ open, onClose, car }: CreateCarDialogProps) {
  const { mutateAsync: createCar, isPending: creating } = useCreateCar();
  const { mutateAsync: updateCar, isPending: updating } = useUpdateCar();

  const isEditing = !!car;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [active, setActive] = useState(true);
  const [brand, setBrand] = useState("");

  // preencher ao editar
  useEffect(() => {
    if (car) {
      setName(car.name ?? "");
      setDescription(car.description ?? "");
      setImageUrl(car.imageUrl ?? "");
      setActive(car.active ?? true);
      setBrand(car.brand ?? "");
    } else {
      setName("");
      setDescription("");
      setImageUrl("");
      setActive(true);
      setBrand("");
    }
  }, [car, open]);

  async function handleSave() {
    const payload: CarDTO = {
      id: car?.id,
      name,
      description,
      imageUrl,
      active,
      brand,
    };

    if (isEditing) {
      await updateCar(payload);
    } else {
      await createCar(payload);
    }

    onClose();
  }

  const isPending = creating || updating;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Carro" : "Novo Carro"}</DialogTitle>
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
            {isPending ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
