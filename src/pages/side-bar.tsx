import { useNavigate } from "react-router-dom";
import { FiBox, FiTruck } from "react-icons/fi";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Painel</h2>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium"
        >
          <FiBox size={18} />
          Produtos
        </button>

        <button
          onClick={() => navigate("/cars")}
          className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium"
        >
          <FiTruck size={18} />
          Carros
        </button>
      </nav>
    </aside>
  );
}
