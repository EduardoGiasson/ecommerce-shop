import { Sidebar } from "@/pages/side-bar";
import { Outlet } from "react-router-dom";
import { CategoryMenu } from "@/cases/categories/components/category-menu";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Área direita */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
          <CategoryMenu
            selectedCategory=""
            onSelectCategory={() => {}}
            searchTerm=""
            onSearchChange={() => {}}
            cart={[]}
            onAddToCart={() => {}}
          />
        </header>

        {/* Conteúdo */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
