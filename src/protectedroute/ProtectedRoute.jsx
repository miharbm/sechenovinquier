import { Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();


    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
