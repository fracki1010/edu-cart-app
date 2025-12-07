import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/Auth/hooks/useAuth";

export const AdminGuard = () => {
    const { user } = useAuth();

    // Si no hay usuario o el rol no es ADMIN, redirigir al home
    if (!user || user.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};