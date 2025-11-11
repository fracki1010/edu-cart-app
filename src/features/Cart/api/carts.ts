import { apiClient } from "../../../services/apiClient";
import type { ICart, CartItemPayload } from "../types/Cart";
import { toCart, toCartApiAdd } from "./mappers";

const USER_ID = 1; // reemplazalo por el id del usuario autenticado

export async function getCart(): Promise<ICart> {
  const response = await apiClient.get(`/users/${USER_ID}/cart`);
  return toCart(response.data);
}

export async function addToCart(payload: CartItemPayload): Promise<ICart> {
  const body = toCartApiAdd(payload);
  const response = await apiClient.post(`/users/${USER_ID}/cart`, body);
  return toCart(response.data);
}

export async function updateCartItem(payload: CartItemPayload): Promise<ICart> {
  const body = toCartApiAdd(payload);
  const response = await apiClient.put(`/users/${USER_ID}/cart`, body);
  return toCart(response.data);
}

export async function deleteCartItem(productId: number): Promise<ICart> {
  const response = await apiClient.delete(`/users/${USER_ID}/cart/items/${productId}`);
  return toCart(response.data);
}

export async function clearCart(): Promise<void> {
  await apiClient.delete(`/users/${USER_ID}/cart`);
}
