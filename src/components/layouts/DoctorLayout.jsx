import { Outlet } from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import { useAuth } from "../../context/AuthContext";

const DoctorLayout = () => {
    const { username, userId } = useAuth();

    return (
        <>
            <AppHeader doctorUsername={username} doctorId={userId} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default DoctorLayout;
