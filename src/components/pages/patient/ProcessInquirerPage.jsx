import {useSearchParams} from "react-router-dom";
import Container from "@mui/material/Container";
import ProcessInquirer from "../../processinquirer/ProcessInquirer.jsx";

const ProcessInquirerPage = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("id");

    return (
        <Container>
            <ProcessInquirer quizId={quizId} />
        </Container>
    )
}

export default ProcessInquirerPage