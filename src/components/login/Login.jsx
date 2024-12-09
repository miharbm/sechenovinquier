import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import {useAuth} from "../../context/AuthContext.jsx";
import {useLoginMutation} from "../../api/authApi.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const LoginForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth()
    const navigate = useNavigate();


    const [loginApi, {
        isLoading,
        error
    }] = useLoginMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        loginApi({username, password})
            .then(({data}) => {
                login(data.userId)
             })
            .then(() => {
                navigate('/');
            })
    }


    return (
        <LoginContainer>
            <h2>Авторизация</h2>
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
                        onClick={handleSubmit}
                >
                    Войти
                </Button>
            </LoginForm>
        </LoginContainer>
    )
}
export default Login
