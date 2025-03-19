import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGetUsersResultsQuery } from "../../api/userApi.js";
import SummaryTableBody from "./SummaryTableBody.jsx";
import SummaryTableBodySkeleton from "./SummaryTableBodySkeleton.jsx";


const SummaryTable = () => {
    const { data, isLoading } = useGetUsersResultsQuery(undefined, {
        skip: false, // Загружаем данные сразу
    });


    return (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
            <Typography variant="h5" gutterBottom component="div" style={{ padding: '16px' }}>
                Результаты тестирований
            </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Дата</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Имя пациента</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Результат</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Детали</TableCell>
                    </TableRow>
                </TableHead>
                {data && <SummaryTableBody data={data} />}
                {isLoading && <SummaryTableBodySkeleton/>}
            </Table>
        </TableContainer>
    );
};

export default SummaryTable;
