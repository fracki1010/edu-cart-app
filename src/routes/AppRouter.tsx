// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ProductsPage } from "../features/Products/views/ProductsPage";
import { CartPage } from "../features/Cart/views/CartPage";
import { LoginPage } from "../features/Auth/views/LoginPage";
import { RegisterPage } from "../features/Auth/views/RegisterPage";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Navigation } from "../components/layout/Navigation";
import { Setting } from "../features/Settings/views/Settings";
import { HomePage } from "../features/Home/views/HomePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Layout principal usando flex vertical */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navigation />

        {/* Contenido principal que crece para ocupar el espacio restante */}
        <main className="flex-1 p-4 bg-gray-50 dark:bg-neutral-900">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};
