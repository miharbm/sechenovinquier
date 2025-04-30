import SummaryDataGrid from "../../summary/SummaryDataGrid.jsx";
import Container from "@mui/material/Container";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs.jsx";

const MainPage = () => {
    return (
        <Container maxWidth="xl" sx={{marginTop: "1rem"}}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <SummaryDataGrid/>
        </Container>
    )
}

export default MainPage;