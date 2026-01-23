import { ProductCard } from "@/cases/products/components/product-card";
import { useCars } from "../hooks/use-cars";

export function CadastroCarrosPage() {
  const { data: cars } = useCars();

  const carsFiltered = cars?.filter(
    (p) => p.category?.name?.toLowerCase() === "carros"
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-8">
        Cadastro de Carros
      </h1>

      <div className="flex gap-8 flex-wrap">
        {carsFiltered?.map((car) => (
          <ProductCard
            key={car.id}
            product={car}
            onAddToCart={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
