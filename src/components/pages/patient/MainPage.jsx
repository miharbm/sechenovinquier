import Container from "@mui/material/Container";
import QuizList from "../../quizlist/QuizList.jsx";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs.jsx";
import SendNotificationButton from "../../notifications/SendNotificationButton.jsx";

const MainPage = () => {
    return (
        <Container sx={{mt: "1rem"}}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <QuizList/>
            <SendNotificationButton/>
        </Container>
    )
}

export default MainPage