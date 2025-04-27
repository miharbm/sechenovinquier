import SummaryDataGrid from "../../summary/SummaryDataGrid.jsx";
import Container from "@mui/material/Container";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const MainPage = () => {
    return (
        <Container maxWidth="xl" sx={{marginTop: "2rem"}}>
            <Breadcrumbs />
            <SummaryDataGrid/>
        </Container>
    )
}

export default MainPage;