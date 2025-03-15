import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { validateEmail } from "../../util/util.js";
import Paper from "@mui/material/Paper";

const Register = () => {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        password_confirm: ""
    });


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "username" && !/^[a-zA-Z0-9_-]*$/.test(value)) return;
        if (["first_name", "middle_name", "last_name"].includes(name) && !/^[а-яА-ЯёЁ]*$/.test(value)) return;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            alert("Некорректный email!");
            return;
        }

        if (formData.password !== formData.password_confirm) {
            alert("Пароли не совпадают!");
            return;
        }

        await register(formData);
    };


    return (
        <Paper sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Регистрация
            </Typography>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2} sx={{mt: "15px"}}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            name="username"
                            label="Имя пользователя"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="last_name"
                            name="last_name"
                            label="Фамилия"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="first_name"
                            name="first_name"
                            label="Имя"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="middle_name"
                            name="middle_name"
                            label="Отчество"
                            value={formData.middle_name}
                            onChange={handleChange}
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
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password"
                            name="password"
                            label="Пароль"
                            inputProps={{ minLength: 6 }}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password_confirm"
                            name="password_confirm"
                            label="Подтверждение пароля"
                            value={formData.password_confirm}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit"
                                variant="contained"
                                sx={{ mt: "5px" }}
                                fullWidth
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined"
                                color="primary"
                                type="button"
                                fullWidth
                                onClick={() => navigate('/login')}
                        >
                            Авторизоваться
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Register;