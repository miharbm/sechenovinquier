import {useGetQuizzesQuery} from "../../api/quizApi.js";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const QuizList = () => {
    const {data} = useGetQuizzesQuery()

    if (!data) return null;

    return (
        <Paper style={{ marginTop: "2rem", padding: "16px", position: "relative" }}>
            <Box p={2}>
                <Typography variant="h5" color={"textSecondary"} gutterBottom>
                    Опросы
                </Typography>
                <Grid container spacing={2} sx={{mt: 1}}>
                    {data.list.map((quiz) => (
                        <Grid item xs={12} sm={6} md={4} key={quiz.quiz_id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {quiz.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {quiz.description}
                                    </Typography>
                                </CardContent>

                                <Box p={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        disabled={!quiz.is_available}
                                        onClick={() => {
                                            // здесь можно добавить навигацию или вызов старта
                                            console.log(`Start quiz ${quiz.quiz_id}`);
                                        }}
                                    >
                                        {quiz.is_available ? 'Пройти' : 'Недоступно'}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    )
}

export default QuizList