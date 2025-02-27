import {useSearchParams} from 'react-router-dom';
import InquierItem from "../InquierItem/InquierItem.jsx";

const  InvestigationDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const passNum = searchParams.get('passnum');
    const userId = searchParams.get('userId');

    return (
        <>
            <InquierItem userId={userId} passNum={passNum} />
        </>
    );
}

export default InvestigationDetailsPage;
