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
import MainLayout from "../layouts/MainLayout.jsx";


const  App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
                    <Route index element={<MainPage />} />
                    <Route path="inquirer" element={<InquiererItemPage />} />
                    <Route path="patient" element={<PatientPage />} />
                    <Route path="patients" element={<PatientsListPage />} />
                    <Route path="patient-registration" element={<PatientRegistrationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route path="/auth" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>

        </Router>
    )
}

export default App
