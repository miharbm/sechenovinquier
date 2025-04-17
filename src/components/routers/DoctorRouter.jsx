import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import DoctorLayout from "../layouts/DoctorLayout.jsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/doctor/MainPage.jsx";
import InquiererItemPage from "../pages/doctor/InquiererItemPage.jsx";
import PatientPage from "../pages/doctor/PatientPage.jsx";
import PatientsListPage from "../pages/doctor/PatientsListPage.jsx";
import PatientRegistrationPage from "../pages/doctor/PatientRegistrationPage.jsx";
import NotFoundPage from "../pages/common/NotFoundPage.jsx";

const DoctorRouter = () => {
    console.log("add doctor router")
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><DoctorLayout/></ProtectedRoute>}>
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

export default DoctorRouter