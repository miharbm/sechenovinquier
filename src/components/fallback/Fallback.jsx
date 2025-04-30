import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

const Fallback = () => {
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

export default Fallback