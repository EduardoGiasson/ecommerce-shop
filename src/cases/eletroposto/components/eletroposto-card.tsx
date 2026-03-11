import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import type { EletroPostoDTO } from "../dtos/eletropostos.dto";

type Props = {
  eletroposto: EletroPostoDTO;
  onEdit?: (eletroposto: EletroPostoDTO) => void;
  onDelete?: (id: string) => void;
};

export function EletropostoCard({ eletroposto, onEdit, onDelete }: Props) {
  const enderecoCompleto = `${eletroposto.rua || "Sem rua"}, ${
    eletroposto.numero || "S/N"
  } - ${eletroposto.bairro || "Sem bairro"}, ${
    eletroposto.cidade || "Sem cidade"
  } - ${eletroposto.cep || "00000-000"}`;

  const handleDelete = () => {
    onDelete?.(eletroposto.id);
  };

  return (
    <Card className="w-[210px] p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      {eletroposto.imageUrl && (
        <img
          src={eletroposto.imageUrl}
          alt={eletroposto.name}
          className="w-[95%] h-20 object-cover rounded-md"
        />
      )}

      <h3 className="text-xs font-semibold text-gray-800 mt-0.5 leading-tight">
        {eletroposto.name}
      </h3>

      <div className="flex flex-col gap-[1px] text-left w-full px-1">
        <p
          className="text-[11px] text-gray-500 line-clamp-2 cursor-help"
          title={enderecoCompleto}
        >
          <span className="font-semibold text-gray-700">Endereço:</span>{" "}
          {enderecoCompleto}
        </p>

        {eletroposto.potencia && (
          <p className="text-[11px] text-blue-600 font-semibold">
            <span className="text-gray-700">Potência:</span>{" "}
            {eletroposto.potencia} kW
          </p>
        )}

        <span
          className={`text-[11px] font-medium ${
            eletroposto.active ? "text-green-600" : "text-red-600"
          }`}
        >
          <span className="text-gray-700">Status:</span>{" "}
          {eletroposto.active ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className="flex gap-1 mt-1 w-full">
        <button
          disabled={!onEdit}
          onClick={() => onEdit?.(eletroposto)}
          className="flex-1 flex items-center justify-center gap-1 py-1 text-[11px] rounded-md bg-gray-800 text-white hover:bg-gray-900 transition active:scale-95 disabled:opacity-40"
        >
          <Pencil size={12} />
          Editar
        </button>

        <button
          disabled={!onDelete}
          onClick={handleDelete}
          className="flex items-center justify-center px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition active:scale-95 disabled:opacity-40"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </Card>
  );
}
