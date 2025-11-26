import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import {
  useFavorites,
  useToggleFavorite,
} from "@/cases/favorites/hooks/use-favorite";
import { FavoriteButton } from "@/cases/favorites/components/data-table/favorite-button";

import {
  useProductReviews,
  useCanRateProduct,
} from "@/cases/reviews/hooks/use-review";
import { RatingStars } from "@/cases/reviews/components/rating-stars";

type ProductCardProps = {
  product: ProductDTO;
  onAddToCart: (product: ProductDTO) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { customer } = useCurrentCustomer();

  const { data: favorites } = useFavorites(customer?.id ?? "");
  const toggleFav = useToggleFavorite(customer?.id ?? "");

  const { data: reviews } = useProductReviews(product.id ?? "");
  const canRate = useCanRateProduct(product.id ?? "");

  const favoriteIds =
    favorites
      ?.map((f) => f.product.id)
      .filter((id): id is string => Boolean(id)) ?? [];

  const myReview = reviews?.find((r) => r.customer.id === customer?.id);
  const myRating = myReview?.stars ?? 0;

  return (
    <Card className="relative max-w-[200px] w-full hover:shadow-lg transition-shadow duration-300 p-3">
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton
          productId={product.id ?? ""}
          favorites={favoriteIds}
          toggle={toggleFav.mutate}
        />
      </div>

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

        {myRating > 0 && (
          <div className="flex justify-center mt-2">
            <RatingStars product={product} fixedValue={myRating} readOnly />
          </div>
        )}

        {myRating === 0 && canRate && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-[10px] text-gray-500 mb-1">Avaliar:</span>
            <RatingStars product={product} />
          </div>
        )}
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
