"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShoppingCart } from "lucide-react";
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

  return (
    <nav className="w-full py-4 flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <h5 className="font-medium text-2xl text-blue-800">Nossos Produtos</h5>
        <p className="text-sm text-blue-400">Novos Produtos todos os dias</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-3 py-2 rounded-md"
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
      </div>
    </nav>
  );
}
