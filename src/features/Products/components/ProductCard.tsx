import { useState } from "react";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useCart } from "../../Cart/hooks/useCart";
import type { IProduct } from "../types/Product";
import { Button } from "@heroui/react";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // const addToCart = (product: IProduct) => {
  //   console.log("Adding to cart:", product);
  // };

  const [addLoading, setAddLoading] = useState(false);

  const { addItem } = useCart();
  const { user } = useAuth();

  const addProductToCart = async () => {
    setAddLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    addItem(user!.id, product);
    setAddLoading(false);
  };

  return (
    <div
      key={product.id}
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {product.name}
          </h3>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`feather feather-star w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Category: {product.category}
        </p>

        <Button
          onPress={() => addProductToCart()}
          className={`w-full text-white py-2 rounded-md ${addLoading ? "bg-green-600" : " bg-indigo-600 dark:bg-indigo-500  hover:bg-indigo-700 dark:hover:bg-indigo-400"} transition-colors`}
        >
          {addLoading ? "Agregado" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};
