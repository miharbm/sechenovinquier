import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/app/App.jsx";
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material/styles";
import { Provider } from 'react-redux';
import {store} from "./store/index.js";
import {AuthProvider} from "./context/AuthContext.jsx";


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
        }
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <AuthProvider>
              <ThemeProvider theme={theme}>
                  <App />
              </ThemeProvider>
          </AuthProvider>
      </Provider>
  </React.StrictMode>,
)
