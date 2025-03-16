import Box from "@mui/material/Box";
import IconLogo from "../../assets/icon.svg";
import Typography from "@mui/material/Typography";

const Logo = ({ variant }) => {
    const isXs = variant === 'xs'; // Проверка пропса, если он равен 'xs', используем размер для xs

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={{ xs: 1, md: 2 }}>
            <Box
                component="img"
                src={IconLogo}
                alt="icon"
                sx={{
                    width: isXs ? 20 : { xs: 20, sm: 30, md: 35 }, // Если variant === 'xs', используем размер 20
                    height: isXs ? 20 : { xs: 20, sm: 30, md: 35 }, // То же для высоты
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    flexGrow: 1,
                    fontSize: isXs ? '1.5rem' : { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Если variant === 'xs', использовать размер 1.5rem
                }}
            >
                ЧекАп
            </Typography>
        </Box>
    );
};

export default Logo;
