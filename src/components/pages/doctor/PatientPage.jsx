import {useParams} from "react-router-dom";
import PatientStatisticChart from "../../patientstatisticchart/PatientStatisticChart.jsx";

const PatientPage = () => {
    const { userId } = useParams();



    return (
        <PatientStatisticChart patientId={userId}/>
    )
}

export default PatientPage