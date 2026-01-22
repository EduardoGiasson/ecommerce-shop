import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useState } from "react";

export function ProductListPage() {
  const { data: products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const filteredProducts = products
    ?.filter(
      (p) => selectedCategory === "all" || p.category.id === selectedCategory
    )
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddToCart = (product: any) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="flex min-h-screen">
      {/* Conteúdo */}
      <main className="flex-1 p-8">
        <CategoryMenu
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          cart={cart}
          onAddToCart={handleAddToCart}
        />

        <section className="flex flex-col mt-8">
          <div className="flex gap-8 flex-wrap">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
