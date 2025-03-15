import './app.scss'
import AppHeader from "../appheader/AppHeader.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../../styles/index.scss"
import MainPage from "../pages/MainPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import PatientRegistrationPage from "../pages/PatientRegistrationPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import InquiererItemPage from "../pages/InquiererItemPage.jsx";
import PatientPage from "../pages/PatientPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import PatientsListPage from "../pages/PatientsListPage.jsx";


const  App = () => {
    const { isAuthenticated, username, userId } = useAuth();


    return (
        <Router>
            <main className={"app"}>
                <div className={"content"}>
                    {isAuthenticated && <AppHeader doctorUsername={username} doctorId={userId}/>}
                    <Routes>
                        <Route path={"/auth"} element={<LoginPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/registration"} element={<RegistrationPage/>}/>
                        <Route path={"/patient-registration"} element={<ProtectedRoute> <PatientRegistrationPage/> </ProtectedRoute>}/>
                        <Route path={"/"} element={<ProtectedRoute> <MainPage/> </ProtectedRoute>}/>
                        <Route path={"/inquirer"} element={<ProtectedRoute> <InquiererItemPage/> </ProtectedRoute>}/>
                        <Route path={"/patient"} element={<ProtectedRoute> <PatientPage/> </ProtectedRoute>}/>
                        <Route path={"/patients"} element={<ProtectedRoute> <PatientsListPage/> </ProtectedRoute>}/>
                        <Route path={"*"} element={<ProtectedRoute> <NotFoundPage/> </ProtectedRoute>} />
                    </Routes>
                </div>
            </main>
        </Router>
    )
}

export default App
