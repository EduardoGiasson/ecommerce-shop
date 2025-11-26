import { Bookmark } from "lucide-react";

interface Props {
  productId: string;
  favorites: string[];
  toggle: (id: string) => void;
}

export function FavoriteButton({ productId, favorites, toggle }: Props) {
  const isFavorite = favorites.includes(productId);

  return (
    <button
      onClick={() => toggle(productId)}
      className="hover:opacity-80 transition cursor-pointer"
    >
      <Bookmark
        className={`w-6 h-6 ${
          isFavorite ? "fill-blue-500 text-blue-500" : "text-gray-400"
        }`}
      />
    </button>
  );
}
