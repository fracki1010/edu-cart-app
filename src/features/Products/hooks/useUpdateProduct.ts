import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { IProduct } from "../types/Product";


type UpdateProductPayload = {
    id: number;
    name: string;
    price: number;
    category: string;
};


export function useUpdateProduct() {
    // 1. Obtiene la instancia del QueryClient
    const queryClient = useQueryClient();

    return useMutation<IProduct, Error, UpdateProductPayload>({

        // Función que realiza la llamada a la API
        mutationFn: (updatedData) => productService.update(updatedData.id, updatedData),

        // 2. Opciones a ejecutar al tener éxito
        onSuccess: (updatedProduct) => {

            // Marca como obsoleta la caché de "products" para forzar una nueva petición
            // al hacer fetch la próxima vez, o si hay un observador activo.
            queryClient.invalidateQueries({ queryKey: ["products"] });


            // Si ya tienes la lista de productos cargada, puedes actualizar el elemento directamente
            // en la caché sin esperar un nuevo fetch.

            queryClient.setQueryData<IProduct[]>(["products"], (oldProducts) => {
                if (!oldProducts) return [];

                return oldProducts.map((p) =>
                    p.id === updatedProduct.id ? updatedProduct : p
                );
            });


            queryClient.setQueryData<IProduct>(["products", updatedProduct.id], updatedProduct);
        },

        // Manejo de errores o rollback de UI
        onError: (error, variables) => {
            console.error("Error al actualizar el producto:", error);
            // Aquí podrías implementar un rollback de la UI si hiciste una actualización optimista
        },
    });
}