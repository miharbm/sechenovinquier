import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const SummaryTableBodySkeleton = () => {
    const columns = [
        { field: "date", headerName: "Дата", flex: 2 },
        { field: "patient", headerName: "Имя пациента", flex: 2 },
        { field: "quizName", headerName: "Название опроса", flex: 2 },
        { field: "result", headerName: "Результат", flex: 2 },
        { field: "details", headerName: "Детали", flex: 1 }
    ];

    const rows = Array.from({ length: 10 }).map((_, index) => ({
        id: index,
        date: "",
        patient: "",
        quizName: "",
        result: "",
        details: ""
    }));

    return (
        <Paper style={{ marginTop: "2rem", padding: "16px", position: "relative" }}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Skeleton variant="text" width={200} height={40} />
            </Box>
            <DataGrid
                rows={rows}
                columns={columns.map(col => ({
                    ...col,
                    renderCell: () => <Skeleton sx={{flex: 1}} />
                }))}
                pageSizeOptions={[10, 25, 50]}
                disableSelectionOnClick
                autoHeight
            />
        </Paper>
    );
};

export default SummaryTableBodySkeleton;
