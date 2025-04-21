import ProtectedRoute from "../../protectedroute/ProtectedRoute.jsx";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/common/NotFoundPage.jsx";
import PatientRoleLayout from "../layouts/PatientRoleLayout.jsx";
import MainPage from "../pages/patient/MainPage.jsx";
import ProcessInquirerPage from "../pages/patient/ProcessInquirerPage.jsx";

const PatientRouter = () => {
    console.log("add patient router")

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><PatientRoleLayout/></ProtectedRoute>}>
                <Route index element={<MainPage />} />
                <Route path="process-inquirer" element={<ProcessInquirerPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default PatientRouter;