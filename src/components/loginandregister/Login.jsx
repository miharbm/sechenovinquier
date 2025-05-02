import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Logo from "../logo/Logo.jsx";
import Box from "@mui/material/Box";
import {useSnackbar} from "notistack";
import {IconButton, InputAdornment, LinearProgress} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {login, isLoading, isAuthenticated, error} = useAuth()
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {variant: "error"})
            console.log("error", error);
        }
    }, [enqueueSnackbar, error]);

    useEffect(() => {
        let timer;
        if (showPassword) {
            timer = setTimeout(() => {
                setShowPassword(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showPassword]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({username, password})
    }

    const handleTogglePassword = () => setShowPassword(prev => !prev);


    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Paper sx={{ padding: "20px", position: "relative" }}>
            {isLoading && <LinearProgress sx={{position: "absolute", width: "100%", top: 0, left: 0}} />}
            <Box marginBottom={"10px"}>
                <Logo variant={"xs"} color={"textSecondary"} />
            </Box>
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
                                   type={showPassword ? "text" : "password"}
                                   variant="outlined"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   fullWidth
                                   InputProps={{
                                       endAdornment: (
                                           <Box
                                               sx={{
                                                   transition: 'opacity 0.3s ease, transform 0.3s ease',
                                                   opacity: password.length > 0 ? 1 : 0,
                                                   transform: password.length > 0 ? 'translateX(0)' : 'translateX(20%)',
                                                   pointerEvents: password.length > 0 ? 'auto' : 'none',
                                               }}
                                           >
                                               <InputAdornment position="start">
                                                   <IconButton onClick={handleTogglePassword} edge="end">
                                                       {showPassword ? <VisibilityOff /> : <Visibility />}
                                                   </IconButton>
                                               </InputAdornment>
                                           </Box>
                                       )
                                   }}
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
    )
}
export default Login
