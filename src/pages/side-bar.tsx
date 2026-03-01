import { useNavigate } from "react-router-dom";
import { FiBox, FiCalendar, FiTruck, FiZap } from "react-icons/fi";
import logo from "@/assets/images/logo.png";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white px-5 py-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="font-medium text-sm tracking-wide">ENERGIZA</span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium transition"
        >
          <FiBox size={18} />
          Inicial
        </button>

        <button
          onClick={() => navigate("/cars")}
          className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium transition"
        >
          <FiTruck size={18} />
          Carros
        </button>
            <button
            onClick={() => navigate("/eletropostos")}
            className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium transition"
          >
            <FiZap size={18} />
            Eletropostos
          </button>

        <button
          onClick={() => navigate("/agendamentos")}
          className="w-full flex items-center gap-3 hover:bg-gray-800 p-3 rounded font-medium transition"
        >
          <FiCalendar size={18} />
          Agendamentos
        </button>

      </nav>
    </aside>
  );
}
