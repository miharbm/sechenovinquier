import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const NotFoundPage = () => {
    return (
        <Container maxWidth="sm">
            <Paper>
                <Box display="flex"
                     alignItems="center"
                     justifyContent="center"
                     flexDirection={"column"}
                     height="50vh"
                     marginTop={"10vh"}
                >
                    <Typography variant="h1" color="textSecondary" sx={{textAlign: "center"}}>
                        404
                    </Typography>
                    <Typography variant="h4" color="textSecondary" sx={{textAlign: "center"}}>
                        Страница не найдена
                    </Typography>
                </Box>
            </Paper>
        </Container>
    )
}

export default NotFoundPage