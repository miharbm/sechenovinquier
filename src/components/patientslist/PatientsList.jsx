import {useEffect, useState} from "react";
import { useGetPatientListQuery } from "../../api/adminApi.js";
import {
    Avatar,
    Box,
    IconButton, LinearProgress,
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
import PatientsListSkeleton from "./PatientsListSkeleton.jsx";
import {errorMessages} from "../../util/util.js";
import {enqueueSnackbar} from "notistack";
import ErrorBlock from "../badstatuses/ErrorBlock.jsx";


const PatientsList = () => {
    const { data: patients, isLoading, isFetching, error } = useGetPatientListQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortAsc, setSortAsc] = useState(true);


    useEffect(() => {
        if (error) {
            const errorMessagesLocal = {
                ...errorMessages,
                400: "Ошибка получения данных"
            }

            enqueueSnackbar(errorMessagesLocal[error?.status] || String(error), { variant: "error" });
            console.error(error)
        }
    }, [error]);


    const filteredPatients = patients?.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const sortedPatients = [...filteredPatients].sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });


    return (
        <Paper elevation={2} sx={{ padding: 2, position: "relative" }} >
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
            {isFetching && <LinearProgress sx={{position: "absolute", width: "100%", top: 0, left: 0}} />}
            {isLoading && <PatientsListSkeleton/>}
            {error && <ErrorBlock message={"Ошибка при загрузке списка пациентов"}/>}

            {patients && (
                <List>
                    {sortedPatients?.map((patient) => (
                        <ListItemButton
                            key={patient.userId}
                            component={RouterLink}
                            to={`/patients/${patient.userId}`}
                            sx={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemAvatar>
                                <Avatar src={patient.avatarUrl}
                                        alt={patient.firstName}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={`${patient.firstName} ${patient.lastName}`} />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default PatientsList;
