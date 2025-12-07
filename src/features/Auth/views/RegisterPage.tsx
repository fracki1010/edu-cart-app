import { AuthForm } from "../../../components/ui/AuthForm";

import { Link, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const handleRegister = async (data: Record<string, string>) => {
    await register(data.username, data.email, data.password, data.name);
    
    if (isAuthenticated){
      navigate('./home')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        onSubmit={handleRegister}
        submitLabel="Crear cuenta"
        fields={[
          { name: "name", label: "Nombre completo" },
          {name: "username", label: "Nombre de usuario"},
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
