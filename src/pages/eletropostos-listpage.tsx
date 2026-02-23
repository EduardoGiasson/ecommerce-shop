
import { CreateEletroPostoDialog } from "@/cases/eletroposto/components/create-eletroposto-dialog";
import { EletropostoCard } from "@/cases/eletroposto/components/eletroposto-card";
import type { EletroPostoDTO } from "@/cases/eletroposto/dtos/eletropostos.dto";
import { useEletroPostos } from "@/cases/eletroposto/hooks/use-eletropostos";
import { useState } from "react";

export function CadastroEletroPostosPage() {
  const { data: eletropostos, isLoading } = useEletroPostos();

  const [search] = useState("");
  const [active] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEletroposto, setSelectedEletroposto] =
    useState<EletroPostoDTO | null>(null);

  const handleCreate = () => {
    setSelectedEletroposto(null);
    setOpenDialog(true);
  };

  const handleEdit = (eletroposto: EletroPostoDTO) => {
    setSelectedEletroposto(eletroposto);
    setOpenDialog(true);
  };

  const eletropostosFiltered = eletropostos?.filter((eletroposto) => {
    const matchSearch = eletroposto.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchActive =
      active === "" ? true : eletroposto.active === (active === "true");

    return matchSearch && matchActive;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Eletropostos</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
        >
          + Cadastrar novo eletroposto
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 my-2" />

      <CreateEletroPostoDialog
        open={openDialog}
        eletroposto={selectedEletroposto}
        onClose={() => setOpenDialog(false)}
      />

      {isLoading && <p className="text-gray-500">Carregando eletropostos...</p>}

      {!isLoading && eletropostosFiltered?.length === 0 && (
        <p className="text-gray-500">Nenhum eletroposto encontrado.</p>
      )}

      <div className="flex gap-6 flex-wrap">
        {eletropostosFiltered?.map((eletroposto) => (
          <EletropostoCard
            key={eletroposto.id}
            eletroposto={eletroposto}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
