import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CarDTO } from "../dtos/cars.dto";

type CarCardProps = {
  car: CarDTO;
  onEdit?: (car: CarDTO) => void;
};

export function CarCard({ car, onEdit }: CarCardProps) {

  return (
    <Card className="max-w-[220px] w-full hover:shadow-lg transition-shadow p-3">
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-28 h-28 object-cover rounded-md mx-auto"
        />
      )}

      <CardHeader className="p-0 mt-2 text-center">
        <h3 className="text-sm font-semibold text-gray-800">
          {car.name}
        </h3>

        <span className="text-xs text-gray-500">
          {car.brand?.name ?? "Marca não informada"}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-0 mt-2 text-center">
        {car.description && (
          <p className="text-xs text-gray-500 line-clamp-3">
            {car.description}
          </p>
        )}

        <span
          className={`text-xs font-semibold ${
            car.active ? "text-green-600" : "text-red-600"
          }`}
        >
          {car.active ? "Ativo" : "Inativo"}
        </span>

        <button
          onClick={() => onEdit?.(car)}
          className="mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition"
        >
          Editar
        </button>
      </CardContent>
    </Card>
  );
}