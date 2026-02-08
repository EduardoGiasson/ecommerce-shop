import { CarCard } from "@/cases/cars/components/cars-card";
import { useState } from "react";
import { CreateCarDialog } from "@/cases/cars/components/create-car-dialog";
import { useCars } from "@/cases/cars/hooks/use-cars";

export function CadastroCarrosPage() {
  const { data: cars, isLoading } = useCars();

  const [search] = useState("");
  const [category] = useState("");
  const [active] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const carsFiltered = cars?.filter((car) => {
    const matchSearch = car.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      !category ||
      car.category?.name?.toLowerCase().includes(category.toLowerCase());

    const matchActive =
      active === ""
        ? true
        : car.active === (active === "true");

    return matchSearch && matchCategory && matchActive;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cadastro de Carros</h1>

        <button
          onClick={() => setOpenDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
        >
          + Adicionar novo carro
        </button>
      </div>

      {/* Dialog */}
      <CreateCarDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {/* Filtros */}
      {/* ... (seu código de filtros continua igual) */}

      {/* Conteúdo */}
      {isLoading && <p className="text-gray-500">Carregando carros...</p>}

      {!isLoading && carsFiltered?.length === 0 && (
        <p className="text-gray-500">Nenhum carro encontrado.</p>
      )}

      <div className="flex gap-6 flex-wrap">
        {carsFiltered?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
