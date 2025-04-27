import RegisterPatient from "../../loginandregister/RegisterPatient.jsx";
import Container from "@mui/material/Container";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const PatientRegistrationPage = () => {
    return (
        <Container sx={{ mt: "2rem" }}>
            <Breadcrumbs />
            <RegisterPatient/>
        </Container>
    )
}

export default PatientRegistrationPage;