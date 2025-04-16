import { Outlet } from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import { useAuth } from "../../context/AuthContext";

const DoctorLayout = () => {
    const { username, userId } = useAuth();

    const links = [
        { title: "Главная", link: "/" },
        { title: "Регистрация пациента", link: "/patient-registration" },
        { title: "Пациенты", link: "/patients" },
    ];

    return (
        <>
            <AppHeader username={username} userId={userId} links={links}/>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default DoctorLayout;
