import {useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../InquierItem/InquierDetailsTable.jsx";
import InquiererDetailsHeader from "../InquierItem/InquiererDetailsHeader.jsx";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PatientInfo from "../patientinfo/PatientInfo.jsx";

const InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');
    const quizId = searchParams.get('quizId');

    return (
        <Container>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={3}>
                    <PatientInfo patientId={userId} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper elevation={0} style={{ padding: '16px'}}>
                        <InquiererDetailsHeader passNum={passNum} quizId={quizId} />
                        <InquierDetailsTable userId={userId} passNum={passNum} quizId={quizId} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}

export default InquiererItemPage;
