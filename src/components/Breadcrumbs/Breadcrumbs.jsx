import { Link as RRDLink, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import {useNavigationList} from "../../context/NavigationListContext.jsx";


const Breadcrumbs = () => {
    const navigation = useNavigationList();
    const location = useLocation();
    const params = useParams();
    const pathSegments = location.pathname.split("/").filter(segment => segment);

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ padding: "10px", backgroundColor: "background.paper" }}>
            <Link underline="hover" color="inherit" to="/" component={RRDLink}>
                Главная
            </Link>

            {pathSegments.map((segment, index) => {
                const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLastSegment = index === pathSegments.length - 1;

                const matchedRoute = navigation.find(route => route.link.includes(segment));
                const displayText =
                    matchedRoute?.breadcrumb || (segment === params.userId ? "Пациент" : segment);

                return isLastSegment ? (
                    <Typography key={index} color="text.primary">
                        {displayText}
                    </Typography>
                ) : (
                    <Link key={index} underline="hover" color="inherit" to={routeTo} component={RRDLink}>
                        {displayText}
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;