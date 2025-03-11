import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {useRegisterUserMutation} from "../../api/api.js";

const PatientRegistrationForm = () => {
    const [sendForm] = useRegisterUserMutation();
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        email: "",
        snils: "",
        password: "",
        password_confirm: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirm) {
            alert("Пароли не совпадают!");
            return;
        }

        try {
            await sendForm(formData).unwrap();
            alert("Пациент успешно зарегистрирован!");
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            alert("Ошибка при регистрации пациента");
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom color="textPrimary" >
                    Регистрация пациента
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                name="username"
                                label="Логин"
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
                                id="phone"
                                name="phone"
                                label="Телефон"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="snils"
                                name="snils"
                                label="СНИЛС"
                                value={formData.snils}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Пароль"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="password_confirm"
                                name="password_confirm"
                                label="Подтвердите пароль"
                                type="password"
                                value={formData.password_confirm}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth={true}>
                        Зарегистрировать
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default PatientRegistrationForm;
