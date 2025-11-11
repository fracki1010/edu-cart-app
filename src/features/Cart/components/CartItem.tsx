// CartItem.tsx

import React from "react";
import { useCart } from "../hooks/useCart";

interface CartItemData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const itemTotal = (item.price * item.quantity).toFixed(2);

  const { removeItem, updateItem } = useCart();


  const updateQuantity = (num: number) => {
    updateItem({product_id: item.id, quantity: item.quantity + num})
  }

  return (
    <div
      key={item.id}
      className="grid grid-cols-12 items-center p-4 border-b border-gray-100 dark:border-neutral-700 last:border-0"
    >
      <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-100">
            {item.name}
          </h4>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 dark:text-red-400 text-sm mt-1 hover:text-red-700 dark:hover:text-red-600 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-trash-2 w-4 h-4 mr-1"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1={10} y1={11} x2={10} y2={17} />
              <line x1={14} y1={11} x2={14} y2={17} />
            </svg>
            Eliminar
          </button>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 text-gray-700 dark:text-gray-200 text-center mb-4 md:mb-0">
        ${item.price.toFixed(2)}
      </div>

      <div className="col-span-4 md:col-span-3 flex items-center justify-center mb-4 md:mb-0 dark:text-gray-400">
        <button
          onClick={() => updateQuantity(-1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-neutral-600 rounded-l-md hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          -
        </button>
        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-neutral-600">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-neutral-600 rounded-r-md hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          +
        </button>
      </div>

      <div className="col-span-4 md:col-span-2 text-right font-medium text-gray-800 dark:text-gray-100">
        ${itemTotal}
      </div>
    </div>
  );
};
