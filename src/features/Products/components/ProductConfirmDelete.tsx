import React from 'react';
import { useDeleteProduct } from '../hooks/useDeleteProduct'; // Ajusta la ruta

interface ProductConfirmDeleteProps {
    productId: number;
    productName: string;
    onClose: () => void; // Función para cerrar el modal
}

export const ProductConfirmDelete = ({ productId, productName, onClose }: ProductConfirmDeleteProps) => {

    // Usamos el hook de mutación de borrado
    const deleteMutation = useDeleteProduct();

    const handleDelete = async () => {
        try {
            // 1. Ejecuta la mutación de borrado
            await deleteMutation.mutateAsync(productId);

            // 2. Cierra el modal después de que la mutación sea exitosa
            onClose();

        } catch (error) {
            // El error se maneja en el hook (onError), pero puedes añadir aquí notificaciones al usuario
            console.error("No se pudo eliminar el producto:", error);
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
                ¿Está seguro de que desea eliminar el producto <span className="font-semibold text-purple-500">{productName}</span>?
                Esta acción es irreversible.
            </p>

            {/* Mensaje de Error (si ocurre un fallo en la API) */}
            {deleteMutation.isError && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300 rounded">
                    <p className="font-bold">Error al eliminar</p>
                    <p>Ocurrió un error: {deleteMutation.error.message}</p>
                </div>
            )}

            {/* Botones de Acción */}
            <div className="pt-4 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-neutral-600 dark:text-gray-200 dark:hover:bg-neutral-500 transition-colors"
                    disabled={deleteMutation.isPending}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${deleteMutation.isPending
                        ? 'bg-red-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'}`}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>
        </div>
    );
};