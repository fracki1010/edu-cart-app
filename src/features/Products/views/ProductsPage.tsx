// src/features/products/views/ProductsPage.tsx
import React, { useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Chip
} from "@heroui/react";
import { ProductFilters } from "../components/ProductFilter";
import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import { Modal } from "../../../components/layout/Modal";
import { ProductCreate } from "../components/ProductCreate";
import { FaPlus, FaSortDown, FaFilter } from "react-icons/fa6";

export const ProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para los filtros
  const [filters, setFilters] = useState({
    categories: [] as string[],
    price_min: undefined as number | undefined,
    price_max: undefined as number | undefined,
  });

  const { data: products, isLoading } = useProducts(filters);

  // Opciones de ordenamiento para el Select
  const sortOptions = [
    { key: "featured", label: "Destacados" },
    { key: "price_asc", label: "Precio: Bajo a Alto" },
    { key: "price_desc", label: "Precio: Alto a Bajo" },
    { key: "newest", label: "Más recientes" },
  ];

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-neutral-900 transition-colors min-h-screen">

      {/* Header de la Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Catálogo Educativo
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Explora las mejores herramientas para tu aprendizaje
          </p>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Mantenemos tu componente pero le damos espacio */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* Puedes envolver tu ProductFilters en un Card de HeroUI dentro del componente mismo */}
            <ProductFilters onApply={setFilters} />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-grow">

          {/* Barra de Controles (Conteo y Ordenamiento) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Mostrando:</span>
              <Chip size="sm" variant="flat" color="secondary">
                {isLoading ? "..." : products?.length || 0} productos
              </Chip>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select
                label="Ordenar por"
                placeholder="Selecciona orden"
                labelPlacement="outside-left"
                className="max-w-2xl w-60"
                defaultSelectedKeys={["featured"]}
                size="sm"
                variant="bordered"
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.key} textValue={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Estado de Carga o Lista */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" label="Cargando productos..." color="primary" />
            </div>
          ) : (
            <ProductList isLoading={isLoading} products={products} />
          )}
        </div>
      </div>

      {/* Modal de Creación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Producto"
      >
        <ProductCreate onClose={() => setIsModalOpen(false)} />
      </Modal>
    </main>
  );
};