import { apiClient } from "../../../services/apiClient";
import type { IProduct } from "../../Products/types/Product";

export interface CartItem {
  id: number;
  product: IProduct;
  quantity: number;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
}

export const getCart = async (userId: number): Promise<Cart> => {
  const { data } = await apiClient.get(`/users/${userId}/cart`);
  return data;
};

export const addItemToCart = async (userId: number, productId: number, quantity: number) => {
  const { data } = await apiClient.post(`/users/${userId}/cart`, {
    product_id: productId,
    quantity,
  });
  return data;
};

export const updateItemQuantity = async (userId: number, productId: number, quantity: number) => {
  const { data } = await apiClient.put(`/users/${userId}/cart`, {
    product_id: productId,
    quantity,
  });
  return data;
};

export const removeItemFromCart = async (userId: number, itemId: number) => {
  const { data } = await apiClient.delete(`/users/${userId}/cart/items/${itemId}`);
  return data;
};

export const clearCart = async (userId: number) => {
  const { data } = await apiClient.delete(`/users/${userId}/cart`);
  return data;
};
