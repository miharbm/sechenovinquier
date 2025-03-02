import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import "./login.scss"
import Typography from "@mui/material/Typography";


const LoginForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

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
        <Container maxWidth="sm" className={"login-container"} sx={{pt: "25svh"}}>
            <Typography variant="h4" gutterBottom>
                Авторизация
            </Typography>
            <LoginForm onSubmit={handleSubmit} >
                <TextField label="Имя пользователя"
                           variant="outlined"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                />
                <TextField label="Пароль"
                           type="password"
                           variant="outlined"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained"
                        color="primary"
                        type={"submit"}
                >
                    {isLoading ? "Вход..." : "Войти"}
                </Button>
                <Button variant="outlined"
                        color="primary"
                        type="button"
                        onClick={() => navigate('/registration')}
                >
                    Зарегистрироваться
                </Button>
            </LoginForm>
        </Container>
    )
}
export default Login
