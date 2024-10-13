import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const { isAuthenticated, loading } = useAuth();

    if (!loading) {
        if (isAuthenticated) {
            return <Outlet />
        } else {
            return (
                <Navigate to="/auth/login" />
            )
        }
    }
}

export default ProtectedRoute;