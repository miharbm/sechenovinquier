import {createTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import {MaterialDesignContent} from "notistack";

const theme = createTheme({
    palette: {
        mode: 'light', // Установите режим светлой темы
        primary: {
            main: '#3d7df5', // Основной цвет
        },
        secondary: {
            // main: '#f50057', // Вторичный цвет
            main: '#f54242', // Вторичный цвет
            // main: '#d32f2f', // Вторичный цвет
            // main: '#e53935', // Вторичный цвет
            // main: '#b71c1c', // Вторичный цвет
        },
        text: {
            primary: "#393939"
        },
        background: {
            default: "#e8e8e8",  // Цвет основного фона
            paper: "#ffffff",     // Цвет фона для `Paper`
        },
    },
    typography: {
        h1: {
            fontFamily: '"Oswald", sans-serif',
        },
    }
});

export const infoColors = {
    ok: "#2e7d32",
    warning: "#ff9800",
    bad: "#f54242",
}

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
        backgroundColor: infoColors.ok,
    },
    '&.notistack-MuiContent-warning': {
        backgroundColor: infoColors.warning,
    },
    '&.notistack-MuiContent-error': {
        backgroundColor: infoColors.bad,
    },
}));


export default theme;