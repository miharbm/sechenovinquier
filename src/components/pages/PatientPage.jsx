import {useSearchParams} from "react-router-dom";
import PatientInfo from "../patientinfo/PatientInfo.jsx";
import PatientStatisticChart from "../PatientStatisticChart/PatientStatisticChart.jsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const PatientPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');


    return (
        <Container>
            <Box style={{ padding: 32}} display={"flex"} gap={"30px"}>
                <PatientInfo patientId={userId} />
                <PatientStatisticChart/>
            </Box>
        </Container>
    )
}

export default PatientPage