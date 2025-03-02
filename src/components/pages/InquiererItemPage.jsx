import {useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../InquierItem/InquierDetailsTable.jsx";
import InquiererDetailsHeader from "../InquierItem/InquiererDetailsHeader.jsx";
import Paper from "@mui/material/Paper";

const  InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');

    return (
        <Paper elevation={0} style={{ padding: '16px', marginTop: '2rem', marginLeft: '3rem' }}>
            <InquiererDetailsHeader userId={userId} passNum={passNum} />
            <InquierDetailsTable userId={userId} passNum={passNum} />
        </Paper>
    );
}

export default InquiererItemPage;
