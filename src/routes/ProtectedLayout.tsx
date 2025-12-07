// src/routes/ProtectedLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Header } from "../components/layout/Header";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";

export const ProtectedLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation(); // Obtenemos la ubicación actual (ej: /checkout)

  if (!token) {
    // Redirigimos al login, pero enviamos el estado "from"
    // para saber a dónde volver después de loguearse.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <main className="flex-1 p-4 bg-gray-50 dark:bg-neutral-900">
        <Outlet /> {/* Renderiza las páginas hijas */}
      </main>

      <Footer />
    </div>
  );
};