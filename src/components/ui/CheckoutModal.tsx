// CheckoutModal.tsx
import React from "react";
import { useCart } from "../../features/Cart/hooks/useCart";
import { useNavigate } from "react-router";

// 1. Reutilizamos tus interfaces
export interface ICart {
  id: number;
  userId: number;
  items: ICartItem[];
  total: number;
}

export interface ICartItem {
  cartId: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

// 2. Interfaz para las Props del Componente
interface CartCheckoutModalProps {
  isVisible: boolean;
  onClose: () => void; // Función para cerrar el modal
  cartData: ICart; // Ahora recibimos el objeto ICart completo
}

export const CheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isVisible,
  onClose,
  cartData,
}) => {
  if (!isVisible) return null;

  const { emptyCart } = useCart();
  const navigator = useNavigate();

  const modalAnimationClasses = isVisible
    ? "opacity-100 translate-y-0 sm:scale-100"
    : "opacity-0 translate-y-4 sm:scale-95";

  const { items, total } = cartData; // Desestructuramos los items y el total de ICart

  return (
    // Overlay (Fondo oscuro semitransparente para efecto flotante)
    <div
      // CLAVE: Cambiamos bg-gray-600 por bg-gray-900 para un contraste más dramático
      className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Contenedor del contenido del Modal con animación y modo oscuro */}
      <div
        className={`relative bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-2xl w-full max-w-lg m-4 
          transform transition-all duration-300 ease-out
          ${modalAnimationClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-neutral-700">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Resumen de tu Pedido (ID: {cartData.id})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-3xl leading-none font-semibold focus:outline-none"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo del Modal (Artículos del Carrito) */}
        <div className="mt-6 text-gray-700 dark:text-gray-300">
          {items.length > 0 ? (
            <>
              <p className="text-lg font-semibold mb-4">
                Artículos en tu carrito:
              </p>
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="text-md font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      x{item.quantity}
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
                <span>Total a Pagar:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <p className="text-lg text-center text-gray-600 dark:text-gray-400">
              Tu carrito está vacío.
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-neutral-700">
          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Volver
          </button>
          <button
            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            onClick={() => {
                navigator('/products')
                emptyCart()
            }}
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
};
