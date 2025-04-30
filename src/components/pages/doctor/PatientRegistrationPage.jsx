import RegisterPatient from "../../loginandregister/RegisterPatient.jsx";
import Container from "@mui/material/Container";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs.jsx";

const PatientRegistrationPage = () => {
    return (
        <Container sx={{ mt: "1rem" }}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <RegisterPatient/>
        </Container>
    )
}

export default PatientRegistrationPage;