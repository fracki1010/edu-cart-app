import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../../../services/apiClient";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setErrorRegister,
} from "../redux/authSlice";
import type { AppDispatch, RootState } from "../../../store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (username: string, password: string) => {
    try {
      dispatch(loginStart());

      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });

      const { access_token, name: nameData, usernameData, id } = response.data;

      //convertimos para el slice
      const user = { id: id, username: usernameData, name: nameData };

      //Tiempo para el loading
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Guardar en Redux + localStorage
      dispatch(loginSuccess({ user, token: access_token }));
      localStorage.setItem("token", access_token);
    } catch (err: any) {
      console.error("Error en login:", err);
      dispatch(loginFailure("Credenciales inválidas o error del servidor"));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  //Register
  const register = async (
    username: string,
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const res = await apiClient.post("/auth/register", {
        username,
        name,
        email,
        password,
      });

      //una vez registrado
      login(res.data.username, password);
    } catch (err: any) {
      console.error(err);

      dispatch(setErrorRegister(err.message || "Error al registrarse"));
    }
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    logoutUser,
    isAuthenticated: Boolean(token),
    register,
  };
};
