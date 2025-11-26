import { useState } from "react";
import { Star } from "lucide-react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateReview } from "../hooks/use-review";

export type RatingStarsProps = {
  product: ProductDTO;
  readOnly?: boolean;
  fixedValue?: number;
};

export function RatingStars({
  product,
  readOnly = false,
  fixedValue,
}: RatingStarsProps) {
  const { customer } = useCurrentCustomer();
  const createReview = useCreateReview();

  const [rating, setRating] = useState(0);

  const displayValue = fixedValue ?? rating;

  function handleRate(value: number) {
    if (readOnly) return;

    setRating(value);

    createReview.mutate({
      stars: value,
      product,
      customer: customer!,
    });
  }

  return (
    <div className="flex gap-1 py-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          onClick={() => handleRate(n)}
          className={`w-6 h-6 ${
            readOnly ? "cursor-default" : "cursor-pointer"
          } ${
            n <= displayValue
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
