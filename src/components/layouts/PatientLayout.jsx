import {Outlet, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import PatientInfo from "../patientinfo/PatientInfo.jsx";
import Container from "@mui/material/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";

const PatientLayout = () => {
    const { userId } = useParams();

    return (
        <Container sx={{ mt: "1rem" }}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={3}>
                    <PatientInfo patientId={userId} />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <Outlet/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientLayout;