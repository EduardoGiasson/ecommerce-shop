import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "@/assets/images/logo.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("Usuário não encontrado.");

      if (!data.user.confirmed_at) {
        toast.warning("Confirme seu email antes de logar.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          token: data.session?.access_token,
        }),
      );

      toast.success("Login realizado com sucesso!");
      navigate("/products");
    } catch (err: any) {
      toast.error(err.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[1800px] min-h-[900px] bg-[#d9f3f2] rounded-lg p-12 relative">
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="font-semibold text-gray-700 text-lg">ENERGIZA</span>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-4xl font-semibold text-black-600 mb-14">LOGIN</h1>

          <div className="w-full max-w-lg">
            <label className="text-sm text-black-600">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 mb-8 border rounded bg-white"
            />

            <label className="text-sm text-black-600">Senha*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 mb-4 border rounded bg-white"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-13 mt-6 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
