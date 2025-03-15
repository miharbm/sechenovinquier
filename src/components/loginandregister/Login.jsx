import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login, isLoading, isAuthenticated} = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({username, password})
    }


    return (
        <Container maxWidth="sm" sx={{pt: "25svh"}}>
            <Paper sx={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Авторизация
                </Typography>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={2} sx={{mt: "15px"}}>
                        <Grid item xs={12}>
                            <TextField label="Имя пользователя"
                                       variant="outlined"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Пароль"
                                       type="password"
                                       variant="outlined"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained"
                                    color="primary"
                                    type={"submit"}
                                    fullWidth
                                    sx={{ mt: "5px" }}
                            >
                                {isLoading ? "Вход..." : "Войти"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={() => navigate('/registration')}
                                    fullWidth
                            >
                                Зарегистрироваться
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Login
