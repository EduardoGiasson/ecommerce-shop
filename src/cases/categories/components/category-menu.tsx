"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

type CategoryMenuProps = {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cart: ProductDTO[];
  onAddToCart: (product: ProductDTO) => void;
  onRemoveFromCart: (productId: string) => void;
};

export function CategoryMenu({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  cart,
  onRemoveFromCart,
}: CategoryMenuProps) {
  const { data: categories } = useCategories();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full py-4 flex items-center justify-between gap-4">
      <div className="flex flex-col pl-6">
        <h5 className="text-3xl font-bold text-blue-900 mb-1 drop-shadow-sm">
          Catálogo Esportivo
        </h5>
        <p className="text-base text-blue-500">
          Camisas de times e seleções de todo o mundo
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowCart((prev) => !prev)}
            className="flex items-center gap-1"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="text-sm bg-red-500 text-white px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Button>

          {showCart && (
            <div className="absolute right-0 mt-2 w-64 bg-white border shadow-md p-4 z-50">
              {cart.length === 0 ? (
                <p className="text-gray-500">Carrinho vazio</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {cart.map((product) => (
                    <li
                      key={product.id}
                      className="flex justify-between items-center"
                    >
                      <span>{product.name}</span>
                      <button
                        onClick={() => onRemoveFromCart(product.id!)}
                        className="text-red-500 text-sm"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-3 py-2 rounded-md flex-1 min-w-[400px]"
        />

        <Button variant="outline" onClick={() => onSelectCategory("all")}>
          Todos
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Categorias
              <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={onSelectCategory}
            >
              {categories?.map((category) => (
                <DropdownMenuRadioItem
                  key={category.id}
                  value={String(category.id)}
                >
                  {category.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full border"
        >
          <User />
        </Button>
      </div>
    </nav>
  );
}
