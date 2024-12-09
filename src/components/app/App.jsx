import './app.scss'
import AppHeader from "../appheader/AppHeader.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import InquierItem from "../InquierItem/InquierItem.jsx";
import "../../styles/index.scss"
import MainPage from "../pages/MainPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import PatientRegistrationPage from "../pages/PatientRegistrationPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import {useAuth} from "../../context/AuthContext.jsx";


const  App = () => {
    const { user } = useAuth();


    return (
        <Router>
            <main className={"app"}>
                <div className={"content"}>
                    {user && <AppHeader doctorName={"Александр Александров"}/>}
                    <Routes>
                        <Route path={"/auth"} element={<LoginPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/registration"} element={<RegistrationPage/>}/>
                        <Route path={"/patient-registration"} element={<ProtectedRoute> <PatientRegistrationPage/> </ProtectedRoute>}/>
                        <Route path={"/"} element={<ProtectedRoute> <MainPage/> </ProtectedRoute>}/>
                        <Route path={"/inquirer/:id"} element={<ProtectedRoute> <InquierItem/> </ProtectedRoute>}/>
                    </Routes>
                </div>
            </main>
        </Router>
    )
}

export default App
