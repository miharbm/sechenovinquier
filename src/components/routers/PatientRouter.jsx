import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage.jsx";
import InquiererItemPage from "../pages/InquiererItemPage.jsx";
import PatientPage from "../pages/PatientPage.jsx";
import PatientsListPage from "../pages/PatientsListPage.jsx";
import PatientRegistrationPage from "../pages/PatientRegistrationPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const PatientRouter = () => {
    console.log("add patient router")

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
                <Route index element={<MainPage />} />
                <Route path="inquirer" element={<InquiererItemPage />} />
                <Route path="patient" element={<PatientPage />} />
                <Route path="patients" element={<PatientsListPage />} />
                <Route path="patient-registration" element={<PatientRegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default PatientRouter;