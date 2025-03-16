import Box from "@mui/material/Box";
import IconLogo from "../../assets/icon.svg";
import Typography from "@mui/material/Typography";


const Logo = () => {
    return (
        <Box display="flex"
             alignItems="center"
             justifyContent="space-between"
             gap={{xs: 1, md: 2}}
        >
            <Box
                component="img"
                src={IconLogo}
                alt="icon"
                sx={{
                    width: {xs: 20, sm: 30, md: 35},
                    height: {xs: 20, sm: 30, md: 35},
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    flexGrow: 1,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
            >
                ЧекАп
            </Typography>
        </Box>
    )
}

export default Logo;