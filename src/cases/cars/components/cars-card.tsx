import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import type { CarDTO } from "../dtos/cars.dto";

type CarCardProps = {
  car: CarDTO;
  onEdit?: (car: CarDTO) => void;
  onDelete?: (id: string) => void;
};

export function CarCard({ car, onEdit, onDelete }: CarCardProps) {
  const handleDelete = () => {
    if (!car.id) return;
    onDelete?.(car.id);
  };

  return (
    <Card className="w-[210px] p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-[95%] h-20 object-cover rounded-md"
        />
      )}

      <h3 className="text-xs font-semibold text-gray-800 mt-0.5 leading-tight">
        {car.name}
      </h3>

      <div className="flex flex-col gap-[1px] text-left w-full px-1">
        {car.description && (
          <p
            className="text-[11px] text-gray-500 line-clamp-2 cursor-help"
            title={car.description}
          >
            <span className="font-semibold text-gray-700">Descrição:</span>{" "}
            {car.description}
          </p>
        )}

        <span
          className={`text-[11px] font-medium ${
            car.active ? "text-green-600" : "text-red-600"
          }`}
        >
          <span className="text-gray-700">Status:</span>{" "}
          {car.active ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className="flex gap-2 mt-1 w-full">
        <button
          disabled={!onEdit}
          onClick={() => onEdit?.(car)}
          className="flex-1 flex items-center justify-center gap-1 py-1 text-[11px] rounded-md bg-gray-800 text-white hover:bg-gray-900 active:scale-95 transition disabled:opacity-40"
        >
          <Pencil size={12} />
          Editar
        </button>

        <button
          disabled={!onDelete}
          onClick={handleDelete}
          className="flex items-center justify-center px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 border border-red-700 active:scale-95 transition disabled:opacity-40"
          title="Excluir carro"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </Card>
  );
}
