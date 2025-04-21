import {Outlet, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import PatientInfo from "../patientinfo/PatientInfo.jsx";
import Container from "@mui/material/Container";

const PatientLayout = () => {
    const { userId } = useParams();

    return (
        <Container>
            <Grid container spacing={2} mt={2}>
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