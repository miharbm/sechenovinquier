import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const NoData = () => (
    <Box textAlign="center" py={5} color="text.secondary">
        <InfoOutlinedIcon fontSize="large" />
        <Typography variant="h6" mt={2}>
            Нет данных для отображения
        </Typography>
    </Box>
);

export default NoData