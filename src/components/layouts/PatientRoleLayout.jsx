import { Outlet } from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import { useAuth } from "../../context/AuthContext";

const PatientRoleLayout = () => {
    const { username, userId } = useAuth();
    const links = [
        { title: "Главная", link: "/" },
    ];

    return (
        <>
            <AppHeader username={username} userId={userId} links={links} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default PatientRoleLayout;
