import {useSearchParams} from "react-router-dom";
import Container from "@mui/material/Container";
import ProcessInquirer from "../../processinquirer/ProcessInquirer.jsx";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const ProcessInquirerPage = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("id");

    return (
        <Container maxWidth="md" sx={{mt: "1rem"}}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <ProcessInquirer quizId={quizId} />
        </Container>
    )
}

export default ProcessInquirerPage