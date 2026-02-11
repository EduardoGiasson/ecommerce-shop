import { CarCard } from "@/cases/cars/components/cars-card";
import { useState } from "react";
import { CreateCarDialog } from "@/cases/cars/components/create-car-dialog";
import { useCars } from "@/cases/cars/hooks/use-cars";
import type { CarDTO } from "@/cases/cars/dtos/cars.dto";

export function CadastroCarrosPage() {
  const { data: cars, isLoading } = useCars();

  const [search] = useState("");
  const [active] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // 🔥 novo estado
  const [selectedCar, setSelectedCar] = useState<CarDTO | null>(null);

  const handleCreate = () => {
    setSelectedCar(null);
    setOpenDialog(true);
  };

  const handleEdit = (car: CarDTO) => {
    setSelectedCar(car);
    setOpenDialog(true);
  };

  const carsFiltered = cars?.filter((car) => {
    const matchSearch = car.name.toLowerCase().includes(search.toLowerCase());

    const matchActive =
      active === "" ? true : car.active === (active === "true");

    return matchSearch && matchActive;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Carros</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
        >
          + Cadastrar novo carro
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 my-2" />

      {/* 🔥 agora recebe car */}
      <CreateCarDialog
        open={openDialog}
        car={selectedCar}
        onClose={() => setOpenDialog(false)}
      />

      {isLoading && <p className="text-gray-500">Carregando carros...</p>}

      {!isLoading && carsFiltered?.length === 0 && (
        <p className="text-gray-500">Nenhum carro encontrado.</p>
      )}

      <div className="flex gap-6 flex-wrap">
        {carsFiltered?.map((car) => (
          <CarCard key={car.id} car={car} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
