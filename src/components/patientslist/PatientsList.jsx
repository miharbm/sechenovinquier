import Paper from "@mui/material/Paper";
import {useGetPatientListQuery} from "../../api/adminApi.js";
import {Link} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";

const PatientsList = () => {
    const {data} =  useGetPatientListQuery();
    console.log(data);

    return (
        <Paper elevation={0} style={{ padding: '16px', marginTop: '2rem' }}>
            {data?.patient_ids && data.patient_ids.map((patient_id) => (
                <Box key={patient_id}>
                    <Link to={`/patient?userId=${patient_id}`} component={RouterLink}>{patient_id}</Link>
                </Box>
            ))}
        </Paper>
    )
}

export default PatientsList;