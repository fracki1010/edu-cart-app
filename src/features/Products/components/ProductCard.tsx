import { useState } from "react";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useCart } from "../../Cart/hooks/useCart";
import type { IProduct } from "../types/Product";
import { FiDelete } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa6";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Modal } from "../../../components/layout/Modal";
import { ProductEdit } from "./ProductEdit";
import { ProductConfirmDelete } from "./ProductConfirmDelete";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { Spinner } from "@heroui/react";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const navigator = useNavigate();
  const [addLoading, setAddLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { addItem } = useCart();
  const { user } = useAuth();


  const addProductToCart = async () => {
    // Simplemente pasas el objeto producto completo
    addItem(product, 1);

  };

  return (
    <>
      <div
        key={product.id}
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 flex flex-col h-full">

          <div className="grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {product.name}
              </h3>
              <span className="text-indigo-600 text-xl dark:text-indigo-400 font-bold">
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
                    className={`feather feather-star w-4 h-4 ${i < Math.round(product.rating)
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
          </div>
          <div className="self-start flex w-full gap-1">
            {
              user?.role === "ADMIN" &&
              <>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="text-white p-2 rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 transition-colors"
                >
                  <AiFillDelete />
                </button>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-white p-2 rounded-md bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors"
                >
                  <AiFillEdit />
                </button>

              </>
            }
            <div className="w-full flex gap-2">
              <Button
                isLoading={addLoading}
                spinner={
                  <Spinner size="sm" variant="wave" color="white" />
                }
                className="flex-1 text-gray-50"
                onPress={() => navigator(`/products/${product.id}`)}
                color={addLoading ? "success" : "secondary"}>
                {addLoading ? "Adding..." : "Show Details"}
              </Button>
              <Button
                isIconOnly
                disabled={user?.role === "admin"}
                onPress={() => addProductToCart()}
                color="primary"
              >
                <FaCartPlus />
              </Button>
            </div>
            {/* <button
              disabled={user?.role === "ADMIN"}
              onClick={() => addProductToCart()}
              className={`w-full text-white py-2 rounded-md ${addLoading ? "bg-green-600" : " bg-indigo-600 dark:bg-indigo-500  hover:bg-indigo-700 dark:hover:bg-indigo-400"} transition-colors`}
            >
              {addLoading ? "Adding..." : "Add to Cart"}
            </button> */}
          </div>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Product">
        <ProductEdit
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedProduct) => {
            // Aquí puedes manejar la actualización del producto, por ejemplo, llamar a una API o actualizar el estado global;
            setIsEditModalOpen(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Product"
      >
        <ProductConfirmDelete
          productId={product.id}
          productName={product.name}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </>
  );
};