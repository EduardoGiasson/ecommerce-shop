// sidebar.tsx

import { useNavigate } from "react-router-dom";

import {
  FiBox,
  FiCalendar,
  FiTruck,
  FiZap,
  FiLogOut,
} from "react-icons/fi";

export function Sidebar() {

  const navigate =
    useNavigate();

  function handleLogout() {

    localStorage.removeItem(
      "user",
    );

    navigate("/");
  }

  return (

    <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 bg-neutral-900 text-white px-5 py-4 flex flex-col justify-between">

      {/* MENU */}

      <nav className="flex flex-col gap-2 mt-2 overflow-y-auto">

        {/* Inicial */}

        <button
          onClick={() =>
            navigate("/products")
          }
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >

          <FiBox size={18} />

          Inicial
        </button>

        {/* CARROS */}

        <button
          onClick={() =>
            navigate("/cars")
          }
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >

          <FiTruck size={18} />

          Carros
        </button>

        {/* ELETROPOSTOS */}

        <button
          onClick={() =>
            navigate(
              "/eletropostos",
            )
          }
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >

          <FiZap size={18} />

          Eletropostos
        </button>

        {/* AGENDAMENTOS */}

        <button
          onClick={() =>
            navigate(
              "/agendamentos",
            )
          }
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >

          <FiCalendar size={18} />

          Agendamentos
        </button>

        {/* FORMULA */}

        <button
          onClick={() =>
            navigate("/formula")
          }
          className="w-full flex items-center gap-3 hover:bg-neutral-800 p-3 rounded font-medium transition"
        >

          <FiZap size={18} />

          Formula
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