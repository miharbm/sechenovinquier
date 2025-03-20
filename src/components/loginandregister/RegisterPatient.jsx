import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import {validateEmail} from "../../util/util.js";
import Paper from "@mui/material/Paper";
import {useRegisterPatientMutation} from "../../api/authApi.js";
import {enqueueSnackbar} from "notistack";

const initialFormData = {
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirm: ""
}

const PatientRegistrationForm = () => {
    const [sendForm, {error, isSuccess}] = useRegisterPatientMutation();
    const [formError, setFormError] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formError) {
            enqueueSnackbar(formError, {variant: "error"})
            console.error(formError)
        }
        if (error) {
            enqueueSnackbar(error, {variant: "error"})
            console.error(error)
        }
        setFormError(null)
    }, [formError, error])

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar("Пациент зарегестрирован", {variant: "success"});
            setFormData(initialFormData);
        }
    }, [isSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Валидация логина (только латиница + цифры)
        if (name === "username" && !/^[a-zA-Z0-9_-]*$/.test(value)) return;

        // Валидация ФИО (только кириллица)
        if (["first_name", "middle_name", "last_name"].includes(name) && !/^[а-яА-ЯёЁ]*$/.test(value)) return;

        // Валидация телефона с автоформатированием
        if (name === "phone") {
            let cleaned = value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
            if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

            let formatted = "+7";
            if (cleaned.length > 1) formatted += ` (${cleaned.slice(1, 4)}`;
            if (cleaned.length > 4) formatted += `) ${cleaned.slice(4, 7)}`;
            if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 9)}`;
            if (cleaned.length > 9) formatted += `-${cleaned.slice(9, 11)}`;

            setFormData(prevState => ({ ...prevState, [name]: formatted }));
            return;
        }

        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setFormError("Некорректный email")
            return;
        }

        if (formData.password !== formData.password_confirm) {
            setFormError("Пароли не совпадают")
            return;
        }

        await sendForm(formData)
    };

    return (
        <Paper sx={{ mt: 4, padding: "20px" }}>
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
                    <Grid item xs={12}>
                        <Button type="submit"
                                variant="contained"
                                sx={{ mt: "5px" }}
                                fullWidth
                        >
                            Зарегистрировать
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default PatientRegistrationForm;
