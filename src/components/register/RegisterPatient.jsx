import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function PatientRegistrationForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Обработка отправки формы
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Регистрация пациента
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Имя пациента"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="policy"
                                name="policy"
                                label="Номер полиса"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="dob"
                                name="dob"
                                type="date"
                                label="Дата рождения"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="diagnosis"
                                name="diagnosis"
                                label="Диагноз"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Зарегистрировать
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default PatientRegistrationForm;
