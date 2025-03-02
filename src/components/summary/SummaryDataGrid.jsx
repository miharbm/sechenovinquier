import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGetUsersResultsQuery } from "../../api/api.js";
import dayjs from "dayjs";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SummaryTableBodySkeleton from "./SummaryTableBodySkeleton.jsx";
import { ruRU } from '@mui/x-data-grid/locales';

const getResultStatus = (isFailed, score) => {
    if (isFailed) return "Положительный";
    if (score > 0) return "С подозрением";
    return "Отрицательный";
};

const SummaryTable = () => {
    const { data, isLoading } = useGetUsersResultsQuery(undefined, {
        skip: false,
    });

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'Дата', flex: 2 },
        { field: 'patient', headerName: 'Имя пациента', flex: 2 },
        {
            field: 'result',
            headerName: 'Результат',
            flex: 2,
            renderCell: (params) => (
                <span style={{ color: params.value === "Отрицательный" ? "red" : params.value === "С подозрением" ? "orange" : "inherit" }}>
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
                <Link to={`/inquirer?userId=${params.row.userId}&passnum=${params.row.passNum}`} component={RouterLink}>
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
        passNum: result.pass_num
    })) : [];

    return (
        <Paper style={{ marginTop: '2rem', padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
                Результаты тестирований
            </Typography>
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
