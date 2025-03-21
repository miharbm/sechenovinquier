import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/app/App.jsx";
import {ThemeProvider} from "@mui/system";
import { Provider } from 'react-redux';
import {store} from "./store/index.js";
import {AuthProvider} from "./context/AuthContext.jsx";
import {CssBaseline} from "@mui/material";
import { SnackbarProvider } from 'notistack';
import theme, {StyledMaterialDesignContent} from "./styles/theme.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <AuthProvider>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <SnackbarProvider maxSnack={4}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                    Components={{
                                        success: StyledMaterialDesignContent,
                                        error: StyledMaterialDesignContent,
                                    }}
                  >
                      <App />
                  </SnackbarProvider>
              </ThemeProvider>
          </AuthProvider>
      </Provider>
  </React.StrictMode>,
)
