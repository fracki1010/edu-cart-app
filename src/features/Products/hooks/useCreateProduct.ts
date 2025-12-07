import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { IProduct } from "../types/Product";

// Define la estructura de datos que necesita la función de creación
// Excluye el 'id' ya que se genera en el backend
type CreateProductPayload = {
    name: string;
    description: string;
    rating: number;
    price: number;
    category_id: number;
    image_url: string;
    stock_current: number;
    stock_min: number;
    sku?: string;
};

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<IProduct, Error, CreateProductPayload>({

        mutationFn: (newProductData) => productService.create(newProductData),

        // Opciones a ejecutar al tener éxito
        onSuccess: (newProduct) => {

            // Marca la lista de productos como obsoleta para que se recargue.
            queryClient.invalidateQueries({ queryKey: ["products"] });

            // Si la lista de productos está cargada, añadimos el nuevo producto al final.
            queryClient.setQueryData<IProduct[]>(["products"], (oldProducts) => {
                if (!oldProducts) return [newProduct];

                // Añade el nuevo producto a la colección existente
                return [...oldProducts, newProduct];
            });
        },

        onError: (error) => {
            console.error("Error al crear el producto:", error);
        },
    });
}