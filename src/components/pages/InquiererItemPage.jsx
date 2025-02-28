import {useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../InquierItem/InquierDetailsTable.jsx";
import Typography from "@mui/material/Typography";

const  InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');

    return (
        <div style={{ padding: '16px', marginTop: '2rem', marginLeft: '3rem' }}>
            <Typography variant="h4" gutterBottom>
                Детали исследования № {passNum} пациента
            </Typography>
            <InquierDetailsTable userId={userId} passNum={passNum} />
        </div>
    );
}

export default InquiererItemPage;
