import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import {Route, Routes} from "react-router-dom";
import InquiererItemPage from "../pages/doctor/InquiererItemPage.jsx";
import NotFoundPage from "../pages/common/NotFoundPage.jsx";
import PatientLayout from "../layouts/PatientLayout.jsx";
import MainPage from "../pages/patient/MainPage.jsx";

const PatientRouter = () => {
    console.log("add patient router")

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><PatientLayout/></ProtectedRoute>}>
                <Route index element={<MainPage />} />
                <Route path="inquirer" element={<InquiererItemPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default PatientRouter;