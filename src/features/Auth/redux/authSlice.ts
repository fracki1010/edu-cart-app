import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      

      // Guardar en localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      // Eliminar de localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setErrorRegister: (state) => {
      state.error = "No se pudo registrar el usuario"
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setErrorRegister } =
  authSlice.actions;

export default authSlice.reducer;
