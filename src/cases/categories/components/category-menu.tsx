import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();

  return (
    <nav>
      <div className="flex items-center justify-end gap-2">
        {!isLoading &&
          categories &&
          categories.map((category) => (
            <Button key={category.id} variant="outline">
              {" "}
              {category.name}
            </Button>
          ))}
      </div>
    </nav>
  );
}
