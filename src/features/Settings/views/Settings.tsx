import React from "react";
// Importa tu hook tipificado
import { useTheme } from "./../hooks/useTheme";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../Auth/hooks/useAuth";

export const Setting: React.FC = () => {
  // Uso del hook: las variables ya están tipificadas por 'useTheme.ts'
  const [currentTheme, setCurrentTheme] = useTheme();

  const { logoutUser } = useAuth();

  // Tipificación del manejador de eventos para un <select>
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // El valor del evento (event.target.value) se castea a Theme
    setCurrentTheme(event.target.value as "light" | "dark" | "system");
  };

  return (
    // Aplicación de estilos con variantes dark:
    <main className="h-screen p-8 bg-gray-50 text-gray-900 dark:bg-neutral-900 dark:text-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Ajustes</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configurá las preferencias de tu aplicación aquí.
        </p>

        <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-xl">
          <div>
            <label className="block text-sm font-medium">Tema</label>
            <select
              className="mt-1 h-10 rounded-xl border px-3 text-sm dark:bg-neutral-900 dark:border-neutral-600 dark:text-gray-200"
              value={currentTheme} // Vinculado al estado
              onChange={handleThemeChange} // Manejador tipificado
            >
              <option value="system">Sistema</option>
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Tamaño de página (listados)
            </label>
            <input
              className="mt-1 h-10 w-28 rounded-xl border px-3 text-sm dark:bg-neutral-900 dark:border-neutral-600 dark:text-gray-200"
              type="number"
              min={5}
              defaultValue={10}
            />
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            (Este formulario es ilustrativo; aquí podés persistir preferencias
            en tu store o backend.)
          </div>

          <div className="pt-10">

            <button
              className="bg-red-500 border text-gray-50 border-gray-800 dark:border-gray-500 rounded-xl flex items-center px-4 py-2 hover:bg-red-900"
              onClick={() => logoutUser()}
            >
              Cerrar Sesion
              <FiLogIn />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
