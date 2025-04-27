import Container from "@mui/material/Container";
import PatientsList from "../../patientslist/PatientsList.jsx";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const PatientsListPage = () => {

    return (
        <Container maxWidth="md" sx={{ mt: "1rem" }}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <PatientsList/>
        </Container>
    )
}

export default PatientsListPage;