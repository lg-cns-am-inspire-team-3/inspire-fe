import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// admin 용

export default function ProtectedRoute({ children }) {

    const { isLogin, role } = useAuth()
    if (!isLogin || role !== "ADMIN") {
        return <Navigate to="/login" />;
    }

    return children;
}
