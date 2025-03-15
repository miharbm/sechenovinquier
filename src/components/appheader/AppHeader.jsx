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
import Grid from "@mui/material/Grid";


const AppHeader = ({ doctorId, doctorUsername }) => {
    const { logout } = useAuth();
    const { data: userData } = useGetUserInfoQuery({ userId: doctorId });
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        {
            title: "Главная",
            link: "/",
        },
        {
            title: "Регистрация пациента",
            link: "/patient-registration",
        },
        {
            title: "Пациенты",
            link: "/patients",
        },
    ]

    const handleClickLogout = () => {
        logout();
    };

    const openDrawer = () => setMenuOpen(true)
    const closeDrawer = () => setMenuOpen(false)

    const handleLinkClick = () => {
        closeDrawer();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h4"
                    sx={{
                        flexGrow: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                    }}
                >
                    Система опросник
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 2 }}>
                    <Grid container spacing={2}>
                        {
                            links.map(({link, title}, index) => (
                                <Grid item key={`link-${index}`}>
                                    <Typography variant="h6">
                                        <Link to={link}>{title}</Link>
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
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
                    <IconButton color="inherit" onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer anchor="right" open={menuOpen} onClose={closeDrawer}>
                <List sx={{ width: 250 }}>
                    {
                        links.map(({link, title}, index) => (
                            <ListItem component={Link}
                                      to={link}
                                      onClick={handleLinkClick}
                                      key={`link_${index}`}
                                      button
                            >
                                <ListItemText primary={title} />
                            </ListItem>
                        ))
                    }
                    <Divider />
                    <ListItem>
                        <ListItemText primary={userData?.first_name ? `${userData.first_name} ${userData.last_name}` : doctorUsername} />
                    </ListItem>
                    <ListItem button onClick={handleLinkClick}>
                        <AccountCircleIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Профиль" />
                    </ListItem>
                    <ListItem button onClick={handleClickLogout} >
                        <ExitToAppIcon sx={{ marginRight: 1 }} />
                        <ListItemText primary="Выход" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default AppHeader;
