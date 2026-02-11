import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Bell } from "lucide-react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

type CategoryMenuProps = {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cart: ProductDTO[];
  onAddToCart: (product: ProductDTO) => void;
};

export function CategoryMenu({}: CategoryMenuProps) {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-end gap-3">
      {/* Notificação */}
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <Bell size={18} className="text-gray-700" />
      </Button>

      {/* Perfil */}
      <Button
        variant="ghost"
        onClick={() => navigate("/profile")}
        className="h-10 w-10 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <User size={20} className="text-gray-700" />
      </Button>
    </nav>
  );
}
