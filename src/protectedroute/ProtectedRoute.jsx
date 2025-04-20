import { Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();


    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100svh"
                flexDirection="column"
                gap={3}
            >
                <CircularProgress size={70}/>
                <Typography variant="h5" color="textSecondary" sx={{ml: "10px"}}>
                    Загрузка...
                </Typography>
            </Box>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
