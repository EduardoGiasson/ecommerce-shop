import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1800px] min-h-[900px] bg-[#d9f3f2] rounded-lg p-12 relative">

        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="font-semibold text-gray-700 text-lg">
            ENERGIZA
          </span>
        </div>

        {/* Botões topo */}
        <div className="absolute top-8 right-8 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 text-black font-medium hover:underline"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-7 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </div>

        {/* Conteúdo principal */}
       <div className="flex flex-col justify-center h-full max-w-2xl mt-24">
          <h1 className="text-5xl font-bold text-gray-700 leading-tight">
            Comercialização de <br />
            Carregamento para Eletropostos
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Agende o seu carregamento com facilidade!
          </p>

          <button
            onClick={() => navigate("/agendar")}
            className="mt-10 w-fit px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-700 transition"
          >
            Agendar Energia
          </button>
        </div>

      </div>
    </div>
  );
}
