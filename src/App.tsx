import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./cases/auth/components/login";
import RegisterPage from "./cases/auth/components/register";
import { ProductListPage } from "./pages/product-list.page";
import { PublicRoute } from "./cases/auth/guards/public-route";
import { ProtectedRoute } from "./cases/auth/guards/protected-route";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

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
        path="/products"
        element={
          <ProtectedRoute>
            <ProductListPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: qualquer outra rota redireciona */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
