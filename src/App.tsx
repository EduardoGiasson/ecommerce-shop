import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./cases/auth/components/login";
import RegisterPage from "./cases/auth/components/register";
import { ProductListPage } from "./pages/product-list.page";
import { PublicRoute } from "./cases/auth/guards/public-route";
import { ProtectedRoute } from "./cases/auth/guards/protected-route";
import { UserProfilePage } from "./pages/user-profile.page";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./cases/main/HomePage";
import { DashboardLayout } from "./layout/DashboardLayout";
import { CadastroCarrosPage } from "./pages/car-listpage";
import { CadastroEletroPostosPage } from "./pages/eletropostos-listpage";

export default function App() {
  return (
    <>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/cars" element={<CadastroCarrosPage />} />
          <Route path="/eletropostos" element={<CadastroEletroPostosPage/>} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </>
  );
}
