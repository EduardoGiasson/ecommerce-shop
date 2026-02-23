import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { UserMap } from "@/components/ui/UserMap";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-[1700px] min-h-[88vh] bg-[#d9f3f2] rounded-2xl p-12 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <span className="font-semibold text-gray-700 text-lg">
              ENERGIZA
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-black font-medium hover:underline"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            >
              Registrar
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 items-center gap-12">
          {/* Texto */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight">
              Comercialização de <br />
              Carregamento para Eletropostos
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-gray-600">
              Agende o seu carregamento com facilidade!
            </p>

            <button
              onClick={() => navigate("/agendar")}
              className="mt-10 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-700 transition"
            >
              Agendar Energia
            </button>
          </div>

          {/* Mapa */}
          <div className="flex-1 h-[500px] rounded-xl overflow-hidden shadow-lg bg-white">
            <UserMap />
          </div>
        </div>
      </div>
    </div>
  );
}
