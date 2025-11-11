import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  cartStart,
  cartSuccess,
  cartFailure,
  clearCartState,
  cartRemoveItem,
  setAlert,
} from "../redux/cartSlice";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../api/carts";
import type { CartItemPayload } from "../types/Cart";
import type { IProduct } from "../../Products/types/Product";

export function useCart() {
  const dispatch = useDispatch();
  const { items, total, loading, error, alert, cartId } = useSelector(
    (state: RootState) => state.cart
  );

  

  const fetchCart = async () => {
    try {
      dispatch(cartStart());
      const data = await getCart();
      console.log(data);
      
      dispatch(cartSuccess(data));
    } catch (err) {
      dispatch(cartFailure("Error al obtener el carrito"));
    }
  };

  const addItem = async (userId: number,product: IProduct) => {
    try {
      if (!userId) throw new Error("Usuario no autenticado");
      dispatch(cartStart());
      const payload: CartItemPayload = {
        product_id: product.id,
        quantity: 1,
      };
      dispatch(setAlert("Se agrego el producto al carrito"))
      const data = await addToCart(payload);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
        
        dispatch(setAlert(null))
    })
      dispatch(cartSuccess(data));
    } catch (err) {
      dispatch(cartFailure("Error al agregar el producto"));
    }
  };

  const updateItem = async (payload: CartItemPayload) => {
    try {
      dispatch(cartStart());
      const data = await updateCartItem(payload);
      dispatch(cartSuccess(data));
    } catch (err) {
      dispatch(cartFailure("Error al actualizar el producto"));
    }
  };

  const removeItem = async (productId: number) => {
    try {    
      dispatch(cartStart());

      dispatch(cartRemoveItem(productId))

      await deleteCartItem(productId);
      
    //   dispatch(cartSuccess(data));
    } catch (err) {
      dispatch(cartFailure("Error al eliminar el producto"));
    }
  };

  const emptyCart = async () => {
    try {
      dispatch(cartStart());
      await clearCart();
      dispatch(clearCartState());
    } catch (err) {
      dispatch(cartFailure("Error al vaciar el carrito"));
    }
  };

  

  return {
    items,
    total,
    loading,
    error,
    alert,
    cartId,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    emptyCart,
  };
}
