import Typography from "@mui/material/Typography";
import {useGetPatientInfoQuery} from "../../api/api.js";

const InquiererDetailsHeader = ({userId, passNum}) => {
    const {data} = useGetPatientInfoQuery({userId})
    console.log(data)

    return (
        <Typography variant="h5" gutterBottom>
            Детали исследования № {passNum} пациента {data.last_name} {data.first_name}
        </Typography>
    )
}

export default InquiererDetailsHeader