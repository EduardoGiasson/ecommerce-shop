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
import { ChevronDown, ShoppingCart, User, Trash } from "lucide-react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCreateOrder } from "@/cases/orders/hooks/use-order";
import { useCreateOrderItem } from "@/cases/orders/hooks/use-order-item";

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

  const createOrder = useCreateOrder();
  const createOrderItem = useCreateOrderItem();

  async function handleCheckout() {
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : null;

    if (!userId) {
      alert("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    try {
      const total = cart.reduce((sum, p) => sum + Number(p.price), 0);

      const orderResult = await createOrder.mutateAsync({
        customer: userId,
        status: "NEW",
        total,
        shipping: 0,
      });

      for (const product of cart) {
        await createOrderItem.mutateAsync({
          product: product.id!,
          order: orderResult.id!,
          quantity: 1,
          value: Number(product.price),
        });
      }

      alert("Pedido finalizado com sucesso!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Erro ao finalizar pedido.");
    }
  }

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
            <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg p-4 z-50 rounded-md">
              {cart.length === 0 ? (
                <p className="text-gray-500">Carrinho vazio</p>
              ) : (
                <>
                  <ul className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                    {cart.map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-gray-600">
                            R$ {Number(product.price).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveFromCart(product.id!)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 border-t pt-3 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      R${" "}
                      {cart
                        .reduce((sum, p) => sum + Number(p.price), 0)
                        .toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleCheckout}
                  >
                    Finalizar Pedido
                  </Button>
                </>
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
