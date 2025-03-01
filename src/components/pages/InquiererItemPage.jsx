import {useSearchParams} from 'react-router-dom';
import InquierDetailsTable from "../InquierItem/InquierDetailsTable.jsx";
import InquiererDetailsHeader from "../InquierItem/InquiererDetailsHeader.jsx";

const  InquiererItemPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');

    return (
        <div style={{ padding: '16px', marginTop: '2rem', marginLeft: '3rem' }}>
            <InquiererDetailsHeader userId={userId} passNum={passNum} />
            <InquierDetailsTable userId={userId} passNum={passNum} />
        </div>
    );
}

export default InquiererItemPage;
