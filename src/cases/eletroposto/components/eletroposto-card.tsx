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

      {/* Imagem */}
      {eletroposto.imageUrl && (
        <img
          src={eletroposto.imageUrl}
          alt={eletroposto.name}
          className="w-28 h-28 object-cover rounded-md"
        />
      )}

      {/* Nome */}
      <h3 className="text-sm font-semibold text-gray-800 mt-2 leading-tight">
        {eletroposto.name}
      </h3>

      {/* Descrição */}
      {eletroposto.description && (
        <p className="text-xs text-gray-500 mt-[2px] line-clamp-3">
          {eletroposto.description}
        </p>
      )}

      {/* Status */}
      <span
        className={`text-xs font-semibold mt-1 ${
          eletroposto.active ? "text-green-600" : "text-red-600"
        }`}
      >
        {eletroposto.active ? "Ativo" : "Inativo"}
      </span>

      {/* Botão editar */}
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
