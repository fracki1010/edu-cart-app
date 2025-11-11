import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICart, ICartItem } from "../types/Cart";
import { removeItemFromCart } from "../services/apiCart";

interface CartState {
  cartId: number;
  items: ICartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  alert: string | null;
}

const initialState: CartState = {
  cartId: 0,
  items: [],
  total: 0,
  loading: false,
  error: null,
  alert: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartSuccess: (state, action: PayloadAction<ICart>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.cartId = action.payload.id;
    },
    cartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCartState: (state) => {
      state.items = [];
      state.total = 0;
    },
    cartRemoveItem: (state, actions: PayloadAction<number>) => {
      console.log("llega");

      const productIdToRemove = actions.payload;
      state.items = state.items.filter(
        (item) => item.productId !== productIdToRemove
      );
    },
    setAlert: (state, action: PayloadAction<string | null>) => {
      state.alert = action.payload;
    },
  },
});

export const {
  cartStart,
  cartSuccess,
  cartFailure,
  clearCartState,
  cartRemoveItem,
  setAlert,
} = cartSlice.actions;
export default cartSlice.reducer;
