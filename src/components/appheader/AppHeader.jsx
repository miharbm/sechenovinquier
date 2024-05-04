import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
const AppHeader = ({doctorName}) => {


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }} >Система опросник</Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">Главная</Link>
                    <Box width={20} display="inline-block" />
                    <Link to="/registration">Регистрация пациента</Link>

                </Typography>
                {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                {/*</Typography>*/}
                <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                    {doctorName}
                </Typography>
                <IconButton color="inherit">
                    <AccountCircleIcon />
                </IconButton>
                <IconButton color="inherit">
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
export default AppHeader;