import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import DoctorRoleLayout from "../layouts/DoctorRoleLayout.jsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/doctor/MainPage.jsx";
import InquiererItemPage from "../pages/doctor/InquiererItemPage.jsx";
import PatientPage from "../pages/doctor/PatientPage.jsx";
import PatientsListPage from "../pages/doctor/PatientsListPage.jsx";
import PatientRegistrationPage from "../pages/doctor/PatientRegistrationPage.jsx";
import NotFoundPage from "../pages/common/NotFoundPage.jsx";
import PatientsLayout from "../layouts/PatientsLayout.jsx";
import PatientLayout from "../layouts/PatientLayout.jsx";

const DoctorRouter = () => {
    console.log("add doctor router")
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><DoctorRoleLayout/></ProtectedRoute>}>
                <Route index element={<MainPage />} />
                <Route path="patients" element={<PatientsLayout />} >
                    <Route index element={<PatientsListPage />} />
                    <Route path=":userId" element={<PatientLayout />} >
                        <Route index element={<PatientPage />} />
                        <Route path="inquirer" element={<InquiererItemPage />} />
                    </Route>
                </Route>
                <Route path="patient-registration" element={<PatientRegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default DoctorRouter