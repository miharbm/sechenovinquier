import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NotFoundPage = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"column"} height="70vh">
            <Typography variant="h1" color="textSecondary" sx={{textAlign: "center"}}>
                404
            </Typography>
            <Typography variant="h4" color="textSecondary" sx={{textAlign: "center"}}>
                Страница не найдена
            </Typography>
        </Box>
    )
}

export default NotFoundPage