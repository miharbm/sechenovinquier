import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import "./register.scss"
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect} from "react";


const Register = () => {
    const {register, isAuthenticated} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("snils", `${Math.floor(Math.random() * 1000000000)}`);

        if (formData.get("password") !== formData.get("password")) {
            alert("Пароли не совпадают!");
            return;
        }

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        await register(formObject)
    };

    return (
        <Container maxWidth="sm" className={"register-container"}>
            <Box sx={{ pt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Регистрация
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="first_name"
                                name="first_name"
                                label="Имя"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="last_name"
                                name="last_name"
                                label="Фамилия"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="Электронная почта"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="username"
                                id="username"
                                name="username"
                                label="Имя пользователя"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Пароль"
                                inputProps={{ minLength: 6 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="password_confirm"
                                name="password_confirm"
                                label="Подтверждение пароля"
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                            fullWidth
                    >
                        Зарегистрироваться
                    </Button>
                    <Button variant="outlined"
                            color="primary"
                            type="button"
                            fullWidth
                            onClick={() => navigate('/login')}
                            sx={{ mt: 2 }}
                    >
                        Авторизоваться
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register