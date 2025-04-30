import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import "../../styles/index.scss"
import LoginPage from "../pages/common/LoginPage.jsx";
import RegistrationPage from "../pages/common/RegistrationPage.jsx";
import {DOCTOR_ROLE, PATIENT_ROLE, useAuth} from "../../context/AuthContext.jsx";
import {lazy, Suspense} from "react";
import Fallback from "../fallback/Fallback.jsx";
const DoctorRouter = lazy(() => import("../routers/DoctorRouter.jsx"));
const PatientRouter = lazy(() => import("../routers/PatientRouter.jsx"));


const  App = () => {
    const {role} = useAuth()

    return (
        <Router>
            <Suspense fallback={<Fallback/>}>
                <Routes>
                    {role === DOCTOR_ROLE && <Route path="/*" element={<DoctorRouter />} />}
                    {role === PATIENT_ROLE && <Route path="/*" element={<PatientRouter />} />}

                    <Route path="/auth" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="*" element={<Navigate to={role ? "/" : "/login"} replace />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
