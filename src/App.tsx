import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./cases/auth/components/login";
import RegisterPage from "./cases/auth/components/register";
import { ProductListPage } from "./pages/product-list.page";
import { PublicRoute } from "./cases/auth/guards/public-route";
import { ProtectedRoute } from "./cases/auth/guards/protected-route";
import { useEffect } from "react";
import { UserProfilePage } from "./pages/user-profile.page";
import { ToastContainer } from "react-toastify";

export default function App() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <>
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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer />
    </>
  );
}
