import { Outlet } from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import { useAuth } from "../../context/AuthContext";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import {NavigationListProvider} from "../../context/NavigationListContext.jsx";

const DoctorRoleLayout = () => {
    const { username, userId } = useAuth();

    // Объединённый массив для ссылок и хлебных крошек
    const navigation = [
        { title: "Главная", link: "/", breadcrumb: "Главная" },
        { title: "Регистрация пациента", link: "/patient-registration", breadcrumb: "Регистрация пациента" },
        { title: "Пациенты", link: "/patients", breadcrumb: "Пациенты" },
    ];

    const links = navigation.map(({ title, link }) => ({ title, link }));

    return (
        <NavigationListProvider navigation={navigation}>
            <AppHeader username={username} userId={userId} links={links} />
            <main>
                <Outlet />
            </main>
        </NavigationListProvider>
    );
};

export default DoctorRoleLayout;