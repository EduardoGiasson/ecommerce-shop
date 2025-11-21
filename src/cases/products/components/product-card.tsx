import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";

type ProductCardProps = {
  product: ProductDTO;
  onAddToCart: (product: ProductDTO) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="max-w-[200px] w-full hover:shadow-lg transition-shadow duration-300 p-3">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-28 h-28 object-cover rounded-md mx-auto"
        />
      )}

      <CardHeader className="p-0 mt-2">
        <h3 className="text-sm font-semibold text-gray-800 text-center">
          {product.name}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-0 mt-1 text-center">
        {product.description && (
          <p className="text-gray-500 text-xs line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-1 mt-1">
          <p className="text-sm font-bold text-blue-700">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 1.15}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>{" "}
            (cartão)
          </p>
          <p className="text-xs font-medium text-green-600">
            ou{" "}
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 0.8}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>{" "}
            no PIX
          </p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          Comprar
        </button>
      </CardContent>
    </Card>
  );
}
