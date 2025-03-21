import { useState } from "react";
import { useGetPatientListQuery } from "../../api/adminApi.js";
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SortIcon from '@mui/icons-material/SortByAlpha';
const apiUrl = import.meta.env.VITE_API_URL


const PatientsList = () => {
    const { data } = useGetPatientListQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    if (!data?.patients) return null;

    const avatarUrl = (url) => (
        url ? `${apiUrl}/static/public/avatars/${url}` : null
    );

    const filteredPatients = data.patients.filter(patient =>
        `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedPatients = [...filteredPatients].sort((a, b) => {
        const nameA = a.first_name.toLowerCase();
        const nameB = b.first_name.toLowerCase();
        return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return (
        <Paper elevation={2} sx={{ padding: 2, marginTop: 3 }} >
            <Typography variant="h5" color={"textSecondary"} sx={{ marginBottom: 2 }}>
                Список пациентов
            </Typography>

            <Box display="flex" alignItems="center" gap={1} marginBottom={2} marginTop={2.5}>
                <TextField
                    label="Поиск по имени"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton onClick={() => setSortAsc(!sortAsc)}>
                    <SortIcon />
                </IconButton>
            </Box>

            <List>
                {sortedPatients?.map((patient) => (
                    <ListItemButton
                        key={patient.user_id}
                        component={RouterLink}
                        to={`/patient?userId=${patient.user_id}`}
                        sx={{ textDecoration: "none", color: "inherit" }}
                    >
                        <ListItemAvatar>
                            <Avatar src={avatarUrl(patient.avatar_url) }
                                    alt={patient.first_name}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={`${patient.first_name} ${patient.last_name}`} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default PatientsList;
