import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { CarDTO } from "../dtos/cars.dto";

type CarCardProps = {
  car: CarDTO;
  onEdit?: (car: CarDTO) => void;
};

export function CarCard({ car, onEdit }: CarCardProps) {
  return (
    <Card className="max-w-[220px] w-full hover:shadow-lg transition-all duration-200 p-3 flex flex-col items-center text-center">
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-28 h-28 object-cover rounded-md"
        />
      )}

      {/* Nome */}
      <h3 className="text-sm font-semibold text-gray-800 mt-2 leading-tight">
        {car.name}
      </h3>

      {/* Descrição */}
      {car.description && (
        <p className="text-xs text-gray-500 mt-[2px] line-clamp-3">
          {car.description}
        </p>
      )}

      {/* Status */}
      <span
        className={`text-xs font-semibold mt-1 ${
          car.active ? "text-green-600" : "text-red-600"
        }`}
      >
        {car.active ? "Ativo" : "Inativo"}
      </span>

      {/* Botão */}
      <button
        disabled={!onEdit}
        onClick={() => onEdit?.(car)}
        className="
          mt-2 flex items-center justify-center gap-2
          px-3 py-1.5 text-sm rounded-md
          bg-gray-800 text-white
          hover:bg-gray-900
          active:scale-95
          transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        <Pencil size={14} />
        Editar
      </button>
    </Card>
  );
}
