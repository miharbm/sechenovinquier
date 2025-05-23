import { Link as RRDLink, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import {useNavigationList} from "../../context/NavigationListContext.jsx";
import Paper from "@mui/material/Paper";


const Breadcrumbs = ({sx}) => {
    const navigation = useNavigationList();
    const location = useLocation();
    const params = useParams();
    const pathSegments = location.pathname.split("/").filter(segment => segment);

    return (
        <Paper sx={{
                    ...sx,
                    overflowX: "hidden",
                }}
               square={false}
        >
            <MuiBreadcrumbs aria-label="breadcrumb" sx={{ padding: "10px 16px", backgroundColor: "background.paper" }}>
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
        </Paper>
    );
};

export default Breadcrumbs;