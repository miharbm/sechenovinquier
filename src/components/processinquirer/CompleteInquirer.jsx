import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CompleteInquirer = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Paper sx={{mt: "2rem"}}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="70vh"
                textAlign="center"
            >
                <CheckCircleIcon sx={{ fontSize: 80, color: 'green', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    Спасибо за прохождение опроса!
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={4}>
                    Ваши ответы успешно сохранены.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGoHome}
                >
                    На главную
                </Button>
            </Box>
        </Paper>
    )
}

export default CompleteInquirer;