import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useAuth } from '../../context/AuthContext.jsx';
import { useGetUserInfoQuery } from '../../api/api.js';

const AppHeader = ({ doctorId, doctorUsername }) => {
    const { logout } = useAuth();
    const { data: userData } = useGetUserInfoQuery({ userId: doctorId });
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClickLogout = () => {
        logout();
    };

    const toggleDrawer = (open) => () => {
        setMenuOpen(open);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>Система опросник</Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/">Главная</Link>
                        <Box width={20} display="inline-block" />
                        <Link to="/patient-registration">Регистрация пациента</Link>
                    </Typography>
                    <Typography variant="h6" sx={{ marginRight: 2 }}>
                        {userData?.first_name ? `${userData.first_name} ${userData.last_name}` : doctorUsername}
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClickLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Главная" />
                    </ListItem>
                    <ListItem button component={Link} to="/patient-registration">
                        <ListItemText primary="Регистрация пациента" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={userData?.first_name ? `${userData.first_name} ${userData.last_name}` : doctorUsername} />
                    </ListItem>
                    <ListItem button>
                        <AccountCircleIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Профиль" />
                    </ListItem>
                    <ListItem button onClick={handleClickLogout}>
                        <ExitToAppIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Выход" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default AppHeader;
