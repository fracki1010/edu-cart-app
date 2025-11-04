import { AuthForm } from "../../../components/ui/AuthForm";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { Link } from "react-router";
import type { AppDispatch } from "../../../store/store";

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (data: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(
      loginSuccess({ user: { email: data.email, name: data.name }, token: "fakeToken" })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        onSubmit={handleRegister}
        submitLabel="Crear cuenta"
        fields={[
          { name: "name", label: "Nombre completo" },
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
      />
      <p className="mt-6 text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-indigo-600 font-medium">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};
