import { AuthForm } from "../../../components/ui/AuthForm";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/authSlice";
import { Link } from "react-router";
import type { AppDispatch } from "../../../store/store"; // Asegurate de exportar el tipo en tu store

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (data: Record<string, string>) => {
    try {
      dispatch(loginStart());
      await new Promise((r) => setTimeout(r, 1000)); // Simulación
      dispatch(
        loginSuccess({ user: { email: data.email }, token: "fakeToken" })
      );
    } catch (err) {
      dispatch(loginFailure("Error al iniciar sesión"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        onSubmit={handleLogin}
        submitLabel="Iniciar sesión"
        fields={[
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
      />
      <p className="mt-6 text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-indigo-600 font-medium">
          Registrate
        </Link>
      </p>
    </div>
  );
};
