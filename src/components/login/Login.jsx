import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

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
    return (
        <LoginContainer>
            <h2>Авторизация</h2>
            <LoginForm>
                <TextField label="Имя пользователя" variant="outlined" />
                <TextField label="Пароль" type="password" variant="outlined" />
                <Button variant="contained" color="primary">
                    Войти
                </Button>
            </LoginForm>
        </LoginContainer>
    );
}
export default Login
