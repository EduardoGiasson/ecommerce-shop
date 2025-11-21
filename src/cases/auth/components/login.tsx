import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        setLoading(false);
        return;
      }

      // Salva usuário no localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.user.id, token: data.session?.access_token })
      );

      toast.success("Login realizado com sucesso!");
      navigate("/products"); // redireciona para a página protegida
    } catch (err: any) {
      toast.error(err.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-6 border rounded"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p
        className="text-center mt-4 text-blue-600 cursor-pointer"
        onClick={() => navigate("/register")}
      >
        Criar conta
      </p>
    </div>
  );
}
