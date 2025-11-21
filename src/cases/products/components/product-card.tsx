import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";

type ProductCardProps = {
  product: ProductDTO;
  onAddToCart: (product: ProductDTO) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="max-w-sm w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {product.description && (
          <p className="text-gray-500 text-sm line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-1 mt-2">
          <p className="text-lg font-bold text-blue-700">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 1.15}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>{" "}
            (cartão)
          </p>
          <p className="text-sm font-medium text-green-600">
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Adicionar ao carrinho
        </button>
      </CardContent>
    </Card>
  );
}
