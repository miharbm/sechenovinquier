import Box from "@mui/material/Box";
import IconLogo from "../../assets/icon.svg";
import Typography from "@mui/material/Typography";

const Logo = ({ variant, color }) => {
    const isXs = variant === 'xs';

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={isXs ? 1 : { xs: 1, md: 2 }}>
            <Box
                component="img"
                src={IconLogo}
                alt="icon"
                sx={{
                    width: isXs ? 20 : { xs: 20, sm: 30, md: 35 },
                    height: isXs ? 20 : { xs: 20, sm: 30, md: 35 },
                }}
            />
            <Typography
                variant="h1"
                sx={{
                    flexGrow: 1,
                    fontSize: isXs ? '1.5rem' : { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
                color={color || "inherit"}
            >
                ЧекАп
            </Typography>
        </Box>
    );
};

export default Logo;
