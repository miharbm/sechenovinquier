import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGetUsersResultsQuery } from "../../api/api.js";
import dayjs from "dayjs";
import {CircularProgress, Link} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SummaryTableBodySkeleton from "./SummaryTableBodySkeleton.jsx";
import { ruRU } from '@mui/x-data-grid/locales';
import Box from "@mui/material/Box";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";


const getResultStatus = (isFailed, score) => {
    if (isFailed) return "Положительный";
    if (score > 0) return "С подозрением";
    return "Отрицательный";
};

const SummaryTable = () => {
    const {
        data,
        isLoading,
        refetch,
        isFetching,
    } = useGetUsersResultsQuery(undefined, {
        skip: false,
    });

    const handleRefresh = () => {
        refetch();
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'Дата', flex: 2 },
        {
            field: 'patient',
            headerName: 'Имя пациента',
            flex: 2,
            renderCell: (params) => (
                <Link
                    to={`/patient?userId=${params.row.userId}`}
                    component={RouterLink}
                >
                    {params.row.patient}
                </Link>
            )
        },
        {
            field: 'result',
            headerName: 'Результат',
            flex: 2,
            renderCell: (params) => (
                <span style={{ color: params.value === "Отрицательный" ? "red" : params.value === "С подозрением" ? "orange" : "green" }}>
                    {params.value}
                </span>
            )
        },
        {
            field: 'details',
            headerName: 'Детали',
            flex: 1,
            disableColumnFilter: true,
            disableColumnMenu: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/inquirer?userId=${params.row.userId}&passnum=${params.row.passNum}&quizId=${params.row.quizId}`} component={RouterLink}>
                    Подробнее
                </Link>
            )
        }
    ];

    const rows = data ? data.user_results.map((result, index) => ({
        id: index + 1,
        date: dayjs(result.pass_time).format("DD.MM.YYYY HH:mm"),
        patient: `${result.last_name} ${result.first_name}`,
        result: getResultStatus(result.is_failed, result.user_score),
        userId: result.user_id,
        passNum: result.pass_num,
        quizId: result.quiz_id,
    })) : [];

    return (
        <Paper style={{ marginTop: '2rem', padding: '16px' }}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" gutterBottom>
                    Результаты тестирований
                </Typography>
                <IconButton onClick={handleRefresh}
                            loading={isFetching}
                            color="primary"
                >
                    {isFetching ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
                </IconButton>
            </Box>

            {isLoading && <SummaryTableBodySkeleton/>}
            {rows.length > 0 && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    disableSelectionOnClick
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                />
            )}
        </Paper>
    );
};

export default SummaryTable;
