import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import {useAuth} from "../../context/AuthContext.jsx";
import {useGetUserInfoQuery} from "../../api/api.js";


const AppHeader = ({doctorId, doctorUsername}) => {
    const { logout } = useAuth();
    const {data} = useGetUserInfoQuery({userId: doctorId})

    const handleClickLogout = () => {
        logout()
    }

    console.log(data)
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }} >Система опросник</Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">Главная</Link>
                    <Box width={20} display="inline-block" />
                    <Link to="/patient-registration">Регистрация пациента</Link>

                </Typography>
                {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                {/*</Typography>*/}
                <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                    {data !== null && data?.first_name !== "" ? `${data?.first_name} ${data?.last_name}` : doctorUsername}
                </Typography>
                <IconButton color="inherit">
                    <AccountCircleIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleClickLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
export default AppHeader;