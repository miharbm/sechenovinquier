import {useSearchParams} from "react-router-dom";
import PatientInfo from "../patientinfo/PatientInfo.jsx";
import PatientStatisticChart from "../patientstatisticchart/PatientStatisticChart.jsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const PatientPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');


    return (
        <Container>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={3}>
                    <PatientInfo patientId={userId} />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <PatientStatisticChart patientId={userId}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientPage