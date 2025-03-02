import {useSearchParams} from "react-router-dom";
import PatientInfo from "../PatientInfo.jsx";

const PatientPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');


    return (
        <PatientInfo patientId={userId} />
    )
}

export default PatientPage