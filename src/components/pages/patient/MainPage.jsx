import Container from "@mui/material/Container";
import QuizList from "../../quizlist/QuizList.jsx";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs.jsx";

const MainPage = () => {
    return (
        <Container sx={{mt: "1rem"}}>
            <Breadcrumbs sx={{mb: "1rem"}}/>
            <QuizList/>
        </Container>
    )
}

export default MainPage