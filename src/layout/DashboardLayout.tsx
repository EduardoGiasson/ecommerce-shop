import { Sidebar } from "@/pages/side-bar";
import { Outlet } from "react-router-dom";
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo das páginas */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
