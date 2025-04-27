import { Outlet } from "react-router-dom";
import AppHeader from "../appheader/AppHeader";
import { useAuth } from "../../context/AuthContext";
import {NavigationListProvider} from "../../context/NavigationListContext.jsx";

const DoctorRoleLayout = () => {
    const { username, userId } = useAuth();

    const navigation = [
        { title: "Главная", link: "/", breadcrumb: "Главная", isShowLink: true },
        { title: "Регистрация пациента", link: "/patient-registration", breadcrumb: "Регистрация пациента", isShowLink: true },
        { title: "Пациенты", link: "/patients", breadcrumb: "Пациенты", isShowLink: true },
        { title: "Опрос", link: "/inquirer", breadcrumb: "Опрос", isShowLink: false },
    ];

    const links = navigation.map(({ title, link, isShowLink }) => (isShowLink && { title, link }));

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