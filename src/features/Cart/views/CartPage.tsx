import React, { useState } from "react";
import { Link } from "react-router";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Advanced Mathematics Textbook",
    price: 49.99,
    quantity: 2,
    image: "https://via.placeholder.com/64x64?text=Book",
  },
];

export const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-8">
        Tu carrito de compras
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-100 dark:bg-neutral-700 p-4 font-medium text-gray-700 dark:text-gray-200">
              <div className="col-span-5">Producto</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-3 text-center">Cantidad</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
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
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
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
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-neutral-600 rounded-l-md hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      -
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-neutral-600">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-neutral-600 rounded-r-md hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-right font-medium text-gray-800 dark:text-gray-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <h3 className="text-xl font-medium mb-2">Tu carrito esta vacio</h3>
                <p className="mb-4">Parece que aún no has agregado nada a tu carrito</p>
                <Link
                  to={'/products'}
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
                >
                  Buscar producto
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Resumen del pedido</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Envio</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Impuestos</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-neutral-600 pt-3 flex justify-between text-lg font-bold text-indigo-600 dark:text-indigo-400">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors font-medium mb-3">
              Pasar por caja
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">o</p>

            <a href="https://huggingface.co/products.html" className="block text-center mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
              Continuar comprando
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
