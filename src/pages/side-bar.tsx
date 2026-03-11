import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiBox,
  FiCalendar,
  FiTruck,
  FiZap,
  FiFolder,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";

export function Sidebar() {
  const navigate = useNavigate();
  const [openCadastros, setOpenCadastros] = useState(false);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 bg-neutral-900 text-white px-5 py-4 flex flex-col justify-between">
      {/* MENU */}
      <nav className="flex flex-col gap-2 mt-2 overflow-y-auto">
        {/* Inicial */}
        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >
          <FiBox size={18} />
          Inicial
        </button>

        {/* Cadastros */}
        <button
          onClick={() => setOpenCadastros(!openCadastros)}
          className="w-full flex items-center justify-between hover:bg-neutral-800 p-3 rounded font-medium transition"
        >
          <div className="flex items-center gap-3">
            <FiFolder size={18} />
            Cadastros
          </div>

          <FiChevronDown
            size={16}
            className={`transition-transform ${openCadastros ? "rotate-180" : ""}`}
          />
        </button>

        {openCadastros && (
          <div className="flex flex-col ml-6 gap-2">
            <button
              onClick={() => navigate("/cars")}
              className="flex items-center gap-3 hover:bg-neutral-800 p-2 rounded transition"
            >
              <FiTruck size={16} />
              Carros
            </button>

            <button
              onClick={() => navigate("/eletropostos")}
              className="flex items-center gap-3 hover:bg-neutral-800 p-2 rounded transition"
            >
              <FiZap size={16} />
              Eletropostos
            </button>
          </div>
        )}

        {/* Agendamentos */}
        <button
          onClick={() => navigate("/agendamentos")}
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >
          <FiCalendar size={18} />
          Agendamentos
        </button>
      </nav>

      {/* SAIR */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded transition font-medium"
      >
        <FiLogOut size={18} />
        Sair
      </button>
    </aside>
  );
}
