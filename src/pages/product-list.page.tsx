import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useState } from "react";

export function ProductListPage() {
  const { data: products } = useProducts();

  const [selectedCategory] = useState("all");
  const [searchTerm] = useState("");
  const [cart, setCart] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );

  const filteredProducts = products
    ?.filter(
      (p) => selectedCategory === "all" || p.category.id === selectedCategory,
    )
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleAddToCart = (product: any) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <section className="flex flex-col">
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
  );
}
