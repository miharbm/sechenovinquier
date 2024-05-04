import './app.scss'
import AppHeader from "../appheader/AppHeader.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "../login/Login.jsx";
import {ThemeProvider} from "@mui/system";
import {  createTheme } from '@mui/material/styles';
import {lightBlue} from "@mui/material/colors";
import RegisterPatient from "../registerPatient/RegisterPatient.jsx";
import Summary from "../summary/Summary.jsx";
import InquierItem from "../InquierItem/InquierItem.jsx";
import "../../styles/index.scss"


const  App = () => {

    const theme = createTheme({
        palette: {
            mode: 'light', // Установите режим светлой темы
            primary: {
                main: '#2196f3', // Основной цвет
            },
            secondary: {
                main: '#f50057', // Вторичный цвет
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <main className={"app"}>
                    <div className={"content"}>
                        <AppHeader doctorName={"Александр Александров"}/>
                        <Routes>
                            {/*<Route path={"/"} element={<MainPage/>}/>*/}
                            <Route path={"/auth"} element={<Login/>}/>
                            <Route path={"/registration"} element={<RegisterPatient/>}/>
                            <Route path={"/"} element={<Summary/>}/>
                            <Route path={"/inquirer/:id"} element={<InquierItem/>}/>

                        </Routes>
                    </div>
                </main>
            </Router>
        </ThemeProvider>
    )
}

export default App
