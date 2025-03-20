import Typography from "@mui/material/Typography";
import {useGetQuizzesQuery} from "../../api/quizApi.js";
import Box from "@mui/material/Box";

const InquiererDetailsHeader = ({passNum, quizId}) => {
    const {data: quizzes} = useGetQuizzesQuery()

    const quizName = quizzes?.list.filter(quiz => quiz.quiz_id === Number(quizId))[0]?.name

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={"0 12px"} flexWrap={"wrap"}>
            <Typography variant="h6" color={"textSecondary"} gutterBottom>
                {quizName}
            </Typography>
            <Typography variant="body2" color={"primary"} gutterBottom>
                № {passNum}
            </Typography>
        </Box>
    )
}

export default InquiererDetailsHeader