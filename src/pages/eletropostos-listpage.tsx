import { useState, useMemo } from "react";
import { CreateEletroPostoDialog } from "@/cases/eletroposto/components/create-eletroposto-dialog";
import { EletropostoCard } from "@/cases/eletroposto/components/eletroposto-card";
import type { EletroPostoDTO } from "@/cases/eletroposto/dtos/eletropostos.dto";
import {
  useEletroPostos,
  useDeleteEletroPosto,
} from "@/cases/eletroposto/hooks/use-eletropostos";
import { Plus } from "lucide-react";

export function CadastroEletroPostosPage() {
  const { data: eletropostos = [], isLoading } = useEletroPostos();
  const deleteMutation = useDeleteEletroPosto();

  const [search] = useState("");
  const [active] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEletroposto, setSelectedEletroposto] =
    useState<EletroPostoDTO | null>(null);

  function handleCreate() {
    setSelectedEletroposto(null);
    setOpenDialog(true);
  }

  function handleEdit(eletroposto: EletroPostoDTO) {
    setSelectedEletroposto(eletroposto);
    setOpenDialog(true);
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  const eletropostosFiltered = useMemo(() => {
    return eletropostos.filter((eletroposto) => {
      const matchSearch = eletroposto.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchActive =
        active === "" ? true : eletroposto.active === (active === "true");

      return matchSearch && matchActive;
    });
  }, [eletropostos, search, active]);

  return (
    <section className="min-h-screen bg-gray-200 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Eletropostos</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition flex items-center gap-2"
        >
          <Plus size={16} />
          Cadastrar novo eletroposto
        </button>
      </div>

      <CreateEletroPostoDialog
        open={openDialog}
        eletroposto={selectedEletroposto}
        onClose={() => setOpenDialog(false)}
      />

      {isLoading && <p className="text-gray-600">Carregando eletropostos...</p>}

      {!isLoading && eletropostosFiltered.length === 0 && (
        <p className="text-gray-600">Nenhum eletroposto encontrado.</p>
      )}

      <div className="flex gap-6 flex-wrap">
        {eletropostosFiltered.map((eletroposto) => (
          <EletropostoCard
            key={eletroposto.id}
            eletroposto={eletroposto}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
