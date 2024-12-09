import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useRegisterMutation} from "../../api/authApi.js";

const Register = () => {
    const [registerApi, {
        error,
        isLoading,
        isSuccess,
    }] = useRegisterMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("first_name"),
            lastName: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirm_password"),
        };

        if (data.password !== data.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        console.log("Данные формы:", data);
        registerApi(formData)
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
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
                                id="confirm_password"
                                name="confirm_password"
                                label="Подтверждение пароля"
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Зарегистрироваться
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register