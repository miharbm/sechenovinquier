import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorBlock = ({ message }) => (
    <Box textAlign="center" py={5} color="error.main">
        <ErrorOutlineIcon fontSize="large" />
        <Typography variant="h6" mt={2}>
            Ошибка загрузки данных
        </Typography>
        <Typography variant="body2">
            {message || 'Попробуйте обновить страницу или повторить позже.'}
        </Typography>
    </Box>
);

export default ErrorBlock;