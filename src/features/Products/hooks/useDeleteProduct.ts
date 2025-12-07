
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { IProduct } from "../types/Product";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    // El tipo de variable es 'number' porque solo necesitamos el ID para borrar
    return useMutation<void, Error, number>({

        // Llamada a la API
        mutationFn: (productId) => productService.delete(productId), // Asume que productService.delete existe

        onSuccess: (_, deletedProductId) => {

            // Marca como obsoleta la caché de "products" para forzar una nueva recarga de la lista
            queryClient.invalidateQueries({ queryKey: ["products"] });

            // Filtramos el producto borrado directamente de la lista en la caché
            queryClient.setQueryData<IProduct[]>(["products"], (oldProducts) => {
                if (!oldProducts) return [];

                return oldProducts.filter((p) => p.id !== deletedProductId);
            });

            // Eliminación del producto individual de la caché
            queryClient.removeQueries({ queryKey: ["products", deletedProductId] });
        },

        onError: (error) => {
            console.error("Error al eliminar el producto:", error);
        },
    });
}