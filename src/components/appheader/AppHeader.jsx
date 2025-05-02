import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../../context/AuthContext.jsx';
import { useGetUserInfoQuery } from '../../api/userApi.js';
import Logo from "../logo/Logo.jsx";
import {Dialog, DialogActions, DialogTitle, ListItemButton} from "@mui/material";
import Button from "@mui/material/Button";

const AppHeader = ({ userId, username, links }) => {
    const { logout } = useAuth();
    const { data: userData } = useGetUserInfoQuery({ userId: userId });
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const location = useLocation();

    const path = location.pathname;
    const segments = path?.split("/");
    const basePath = "/" + (segments[1] ?? "");


    const openDrawer = () => setMenuOpen(true);
    const closeDrawer = () => setMenuOpen(false);
    const handleLinkClick = () => closeDrawer();
    const handleClickLogout = () => setConfirmOpen(true);
    const handleCancelLogout = () => setConfirmOpen(false);

    const handleConfirmLogout = () => {
        setConfirmOpen(false);
        logout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Logo />
                </Box>
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', flexGrow: 2, justifyContent: "space-between" }}>
                    <Tabs value={basePath} textColor="inherit" indicatorColor="secondary">
                        {links.map(({ link, title }) => (
                            <Tab key={link}
                                 label={title}
                                 component={Link}
                                 to={link}
                                 value={link}
                            />
                        ))}
                    </Tabs>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Typography variant="h6" sx={{ marginRight: 2 }}>
                            {userData?.first_name ? `${userData.first_name} ${userData.last_name}` : username}
                        </Typography>
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleClickLogout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                    <IconButton color="inherit" onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer anchor="right"
                    open={menuOpen}
                    onClose={closeDrawer}
            >
                <Box display="flex" flexDirection="column" justifyContent="space-between" height={"100svh"}>
                    <Box>
                        <List sx={{ width: 250 }}>
                            {links.map(({ link, title }) => (
                                <ListItemButton key={link}
                                                to={link}
                                                onClick={handleLinkClick}
                                                selected={basePath === link}
                                                component={Link}
                                >
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            ))}
                            <Divider />
                            <ListItem>
                                <ListItemText primary={userData?.first_name ? `${userData.first_name} ${userData.last_name}` : username} />
                            </ListItem>
                            <ListItemButton onClick={handleLinkClick}>
                                <AccountCircleIcon sx={{ marginRight: 1 }} />
                                <ListItemText primary="Профиль" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClickLogout}>
                                <ExitToAppIcon sx={{ marginRight: 1 }} />
                                <ListItemText primary="Выход" />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box pb={3}>
                        <Typography variant="body2" color="textSecondary" textAlign="center">
                            Версия: {__APP_VERSION__}
                        </Typography>
                    </Box>
                </Box>
            </Drawer>

            <Dialog
                open={confirmOpen}
                onClose={handleCancelLogout}
            >
                <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelLogout} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmLogout} color="error" autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
};

export default AppHeader;
