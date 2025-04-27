import Container from "@mui/material/Container";
import PatientsList from "../../patientslist/PatientsList.jsx";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const PatientsListPage = () => {

    return (
        <Container maxWidth="md" sx={{ mt: "2rem" }}>
            <Breadcrumbs />
            <PatientsList/>
        </Container>
    )
}

export default PatientsListPage;