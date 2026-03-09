import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";

type Props = {
  eletroposto: EletroPostoDTO;
  onEdit?: (eletroposto: EletroPostoDTO) => void;
};

export function EletropostoCard({ eletroposto, onEdit }: Props) {
  return (
    <Card className="max-w-[220px] w-full hover:shadow-lg transition-all duration-200 p-3 flex flex-col items-center text-center">

      {eletroposto.imageUrl && (
        <img
          src={eletroposto.imageUrl}
          alt={eletroposto.name}
          className="w-28 h-28 object-cover rounded-md"
        />
      )}

      <h3 className="text-sm font-semibold text-gray-800 mt-2 leading-tight">
        {eletroposto.name}
      </h3>

      {eletroposto.endereco && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {eletroposto.endereco}
        </p>
      )}

      {eletroposto.potencia && (
        <p className="text-xs text-blue-600 font-semibold mt-1">
          {eletroposto.potencia} kW
        </p>
      )}

      <span
        className={`text-xs font-semibold mt-1 ${
          eletroposto.active ? "text-green-600" : "text-red-600"
        }`}
      >
        {eletroposto.active ? "Ativo" : "Inativo"}
      </span>

      <button
        disabled={!onEdit}
        onClick={() => onEdit?.(eletroposto)}
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