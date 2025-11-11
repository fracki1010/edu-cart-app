// CartSummary.tsx

import React, { useState } from "react";
import { Link } from "react-router";
import { CheckoutModal } from "../../../components/ui/CheckoutModal";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../../Auth/hooks/useAuth";
import { Button } from "@heroui/button";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
}) => {
  const { cartId, items } = useCart();
  const { user } = useAuth();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] =
    useState<boolean>(false);

  const openCheckoutModal = () => setIsCheckoutModalOpen(true);
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Resumen del pedido
      </h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Envio</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            ${shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Impuestos</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-600 pt-3 flex justify-between text-lg font-bold text-indigo-600 dark:text-indigo-400">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
       className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors font-medium mb-3"
       onClick={openCheckoutModal}
       >
      
        Pasar por caja
      </button>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">o</p>

      <Link
        to="/products"
        className="block text-center mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
      >
        Continuar comprando
      </Link>

      <CheckoutModal
        isVisible={isCheckoutModalOpen}
        onClose={closeCheckoutModal}
        cartData={{
          id: cartId,
          userId: user!.id ,
          items,
          total,
        }}
      />
    </div>
  );
};
