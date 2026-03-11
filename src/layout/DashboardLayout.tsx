import { Sidebar } from "@/pages/side-bar";
import { Outlet } from "react-router-dom";
import { CategoryMenu } from "@/cases/categories/components/category-menu";
import logo from "@/assets/images/logo.png";

export function DashboardLayout() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-blue-900 border-b border-blue-950 flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          <span className="text-lg font-semibold text-white tracking-wide">
            ENERGIZA
          </span>
        </div>

        <div className="text-white">
          <CategoryMenu
            selectedCategory=""
            onSelectCategory={() => {}}
            searchTerm=""
            onSearchChange={() => {}}
            cart={[]}
            onAddToCart={() => {}}
          />
        </div>
      </header>

      {/* Corpo */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
