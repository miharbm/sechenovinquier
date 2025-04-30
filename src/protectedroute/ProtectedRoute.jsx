import { Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import Fallback from "../components/fallback/Fallback.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();


    if (isLoading) {
        return <Fallback/>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
