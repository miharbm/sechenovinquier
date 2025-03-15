import {useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../InquierItem/InquierDetailsTable.jsx";
import InquiererDetailsHeader from "../InquierItem/InquiererDetailsHeader.jsx";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

const InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');
    const quizId = searchParams.get('quizId');

    return (
        <Container>
            <Paper elevation={0} style={{ padding: '16px', marginTop: '2rem' }}>
                <InquiererDetailsHeader userId={userId} passNum={passNum} quizId={quizId} />
                <InquierDetailsTable userId={userId} passNum={passNum} quizId={quizId} />
            </Paper>
        </Container>

    );
}

export default InquiererItemPage;
