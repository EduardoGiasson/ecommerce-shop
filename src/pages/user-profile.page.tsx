import { useNavigate } from "react-router-dom";

export function UserProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Perfil do Usuário</h2>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
