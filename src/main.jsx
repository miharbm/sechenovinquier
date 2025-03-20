import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/app/App.jsx";
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material/styles";
import { Provider } from 'react-redux';
import {store} from "./store/index.js";
import {AuthProvider} from "./context/AuthContext.jsx";
import {CssBaseline} from "@mui/material";
import { SnackbarProvider } from 'notistack';


const theme = createTheme({
    palette: {
        mode: 'light', // Установите режим светлой темы
        primary: {
            main: '#3d7df5', // Основной цвет
        },
        secondary: {
            main: '#f50057', // Вторичный цвет
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <AuthProvider>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <SnackbarProvider maxSnack={4}>
                      <App />
                  </SnackbarProvider>
              </ThemeProvider>
          </AuthProvider>
      </Provider>
  </React.StrictMode>,
)
