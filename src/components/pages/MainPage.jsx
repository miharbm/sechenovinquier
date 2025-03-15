import SummaryTable from "../summary/SummaryTable.jsx";
import SummaryDataGrid from "../summary/SummaryDataGrid.jsx";
import Container from "@mui/material/Container";

const MainPage = () => {
    return (
        <Container maxWidth="xl">
            {/*<SummaryTable/>*/}
            <SummaryDataGrid/>
        </Container>
    )
}

export default MainPage;