import {useParams, useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../../InquierItem/InquierDetailsTable.jsx";
import InquiererDetailsHeader from "../../InquierItem/InquiererDetailsHeader.jsx";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const { userId } = useParams();

    const quizId = searchParams.get('quizId');

    return (
        <Paper elevation={0} style={{ padding: '16px'}}>
            <InquiererDetailsHeader passNum={passNum} quizId={quizId} />
            <Divider/>
            <InquierDetailsTable userId={userId} passNum={passNum} quizId={quizId} />
        </Paper>
    );
}

export default InquiererItemPage;
