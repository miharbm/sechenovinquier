import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import {CircularProgress, LinearProgress, Link} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ruRU } from '@mui/x-data-grid/locales';
import Box from "@mui/material/Box";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import {errorMessages, getInfoColor, getResultStatus} from "../../util/util.js";
import {useGetPatientResultsQuery} from "../../api/adminApi.js";
import SummaryDataGridSkeleton from "./SummaryDataGridSkeleton.jsx";
import {enqueueSnackbar} from "notistack";

import "./summary.scss"
import ViewedCell from "./cells/ViewedCell.jsx";
import ErrorBlock from "../badstatuses/ErrorBlock.jsx";

const STORAGE_KEY = "summaryTableState";


const SummaryTable = () => {
    const { data: results, isLoading, refetch, isFetching, error } = useGetPatientResultsQuery(undefined, { skip: false });

    // Загружаем состояние из localStorage или используем дефолтное
    const [tableState, setTableState] = useState(() => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        return savedState
            ? JSON.parse(savedState)
            : {
                page: 0,
                pageSize: 10,
                sortModel: [{ field: "date", sort: "desc" }], // Дата убывает по умолчанию
                filterModel: { items: [] },
            };
    });


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

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tableState));
    }, [tableState]);

    const handleRefresh = () => {
        refetch();
    };

    const handleStateChange = (newState) => {
        setTableState((prevState) => ({
            ...prevState,
            page: newState.paginationModel?.page ?? prevState.page,
            pageSize: newState.paginationModel?.pageSize ?? prevState.pageSize,
            sortModel: newState.sortingModel ?? prevState.sortModel,
            filterModel: newState.filterModel ?? prevState.filterModel,
        }));
    };

    const columns = [
        { field: "date", headerName: "Дата", flex: 2, sortable: true, minWidth: 135 },
        {
            field: "patient",
            headerName: "Имя пациента",
            flex: 2,
            minWidth: 120,
            renderCell: (params) => (
                <Link to={`/patients/${params.row.userId}`} component={RouterLink}>
                    {params.row.patient}
                </Link>
            ),
        },
        { field: "quizName", headerName: "Название опроса", flex: 2, sortable: true, minWidth: 200},
        {
            field: "result",
            headerName: "Результат",
            flex: 2,
            minWidth: 135,
            renderCell: (params) => (
                <span style={{ color: getInfoColor(params.value) }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "isViewed",
            headerName: "Просмотрено",
            flex: 1,
            minWidth: 120,
            sortable: false,
            filterable: true,
            renderCell: (params) => <ViewedCell isViewed={params.value} rowValues={params.row}/>
        },
        {
            field: "details",
            headerName: "Детали",
            flex: 1,
            minWidth: 100,
            disableColumnFilter: true,
            disableColumnMenu: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/patients/${params.row.userId}/inquirer?passnum=${params.row.passNum}&quizId=${params.row.quizId}`}
                      component={RouterLink}
                >
                    Подробнее
                </Link>
            ),
        },
    ];

    const rows = results
        ? results.map((result, index) => ({
            id: index + 1,
            date: dayjs(result.passTime).format("DD.MM.YYYY HH:mm"),
            patient: `${result.patientLastName} ${result.patientFirstName}`,
            result: getResultStatus(result.isFailed, result.userScore),
            userId: result.userId,
            passNum: result.passNum,
            quizId: result.quizId,
            quizName: result.quizName,
            isViewed: result.isViewed,
        }))
        : [];

    return (
        <Paper style={{ padding: "16px", position: "relative" }}>
            {isFetching && <LinearProgress sx={{position: "absolute", width: "100%", top: 0, left: 0}} />}
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" color={"textSecondary"} gutterBottom>
                    Результаты тестирований
                </Typography>
                <IconButton onClick={handleRefresh} color="primary">
                    {isFetching ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
                </IconButton>
            </Box>

            {error && <ErrorBlock message={"Ошибка при загрузке результатов тестирований"}/>}
            {isLoading && <SummaryDataGridSkeleton />}
            {rows.length > 0 && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]}
                    paginationModel={{ pageSize: tableState.pageSize, page: tableState.page }}
                    sortingModel={tableState.sortModel}
                    filterModel={tableState.filterModel}
                    onPaginationModelChange={(model) => handleStateChange({ paginationModel: model })}
                    onSortingModelChange={(model) => handleStateChange({ sortingModel: model })}
                    onFilterModelChange={(model) => handleStateChange({ filterModel: model })}
                    // disableSelectionOnClick
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    initialState={{
                        sorting: { sortModel: tableState.sortModel },
                    }}
                    getRowClassName={(params) =>
                        params.row.isViewed === false ? 'unviewed-row' : ''
                    }
                />
            )}
        </Paper>
    );
};

export default SummaryTable;
