import Typography from "@mui/material/Typography";
import {useGetUserInfoQuery} from "../../api/api.js";

const InquiererDetailsHeader = ({userId, passNum, quizId}) => {
    const {data} = useGetUserInfoQuery({userId})


    return (
        <Typography variant="h5" gutterBottom>
            Детали исследования № {passNum} типа {quizId} пациента {data?.last_name} {data?.first_name}
        </Typography>
    )
}

export default InquiererDetailsHeader