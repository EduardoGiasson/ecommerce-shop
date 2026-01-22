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
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { toast } from "react-toastify";

type CategoryMenuProps = {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cart: ProductDTO[];
  onAddToCart: (product: ProductDTO) => void;
};

export function CategoryMenu({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  cart,
}: CategoryMenuProps) {
  const { data: categories } = useCategories();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const createOrder = useCreateOrder();
  const createOrderItem = useCreateOrderItem();
  const { customer } = useCurrentCustomer();

  async function handleCheckout() {
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : null;

    if (!userId) {
      toast.error("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    try {
      const total = cart.reduce((sum, p) => sum + Number(p.price), 0);

      const orderResult = await createOrder.mutateAsync({
        customer: customer!.id!,
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

      toast.success("Pedido finalizado com sucesso!");

      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao finalizar pedido.");
    }
  }

  return (
    <nav className="w-full py-4 flex items-center justify-between gap-4">
      <div className="flex flex-col pl-6"/>
      <div className="flex items-center gap-2">

        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-3 py-2 rounded-md flex-1 min-w-[400px]"
        />

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
