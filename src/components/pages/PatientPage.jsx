import {useSearchParams} from "react-router-dom";
import PatientInfo from "../patientinfo/PatientInfo.jsx";

const PatientPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');


    return (
        <div style={{ padding: 32}}>
            <PatientInfo patientId={userId} />
        </div>
    )
}

export default PatientPage