import { CarCard } from "@/cases/cars/components/cars-card";
import { useState } from "react";
import { CreateCarDialog } from "@/cases/cars/components/create-car-dialog";
import { useCars, useDeleteCar } from "@/cases/cars/hooks/use-cars";
import type { CarDTO } from "@/cases/cars/dtos/cars.dto";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

export function CadastroCarrosPage() {
  const { data: cars, isLoading } = useCars();
  const { mutate: deleteCar } = useDeleteCar();

  const [search] = useState("");
  const [active] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarDTO | null>(null);
  const [carToDelete, setCarToDelete] = useState<CarDTO | null>(null);

  const handleCreate = () => {
    setSelectedCar(null);
    setOpenDialog(true);
  };

  const handleEdit = (car: CarDTO) => {
    setSelectedCar(car);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    const car = cars?.find((c) => c.id === id);
    if (!car) return;

    setCarToDelete(car);
  };

  const confirmDelete = () => {
    if (!carToDelete?.id) return;

    deleteCar(carToDelete.id);
    setCarToDelete(null);
  };

  const carsFiltered = cars?.filter((car) => {
    const matchSearch = car.name.toLowerCase().includes(search.toLowerCase());

    const matchActive =
      active === "" ? true : car.active === (active === "true");

    return matchSearch && matchActive;
  });

  return (
    <section className="min-h-screen bg-gray-200 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
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

      <CreateCarDialog
        open={openDialog}
        car={selectedCar}
        onClose={() => setOpenDialog(false)}
      />

      <ConfirmDeleteDialog
        open={!!carToDelete}
        title="Excluir carro"
        description={`Deseja realmente excluir o carro "${carToDelete?.name}"?`}
        onCancel={() => setCarToDelete(null)}
        onConfirm={confirmDelete}
      />

      {isLoading && <p className="text-gray-600">Carregando carros...</p>}

      {!isLoading && carsFiltered?.length === 0 && (
        <p className="text-gray-600">Nenhum carro encontrado.</p>
      )}

      <div className="flex gap-6 flex-wrap">
        {carsFiltered?.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
