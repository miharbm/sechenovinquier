import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useGetUsersResultsQuery } from "../../api/api.js";
import dayjs from 'dayjs';

const getResultStatus = (isFailed, score) => {
    if (isFailed) return "Положительный";
    if (score > 0) return "С подозрением";
    return "Отрицательный";
};

const SummaryTable = () => {
    const { data } = useGetUsersResultsQuery(undefined, {
        skip: false, // Загружаем данные сразу
    });

    if (!data) return <Typography>Загрузка...</Typography>;

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
                <TableBody>
                    {data.user_results.map((result, index) => {
                        const formattedDate = dayjs(result.pass_time).format("DD.MM.YYYY HH:mm");
                        const status = getResultStatus(result.is_failed, result.user_score);

                        return (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{formattedDate}</TableCell>
                                <TableCell>{`${result.last_name} ${result.first_name}`}</TableCell>
                                <TableCell
                                    style={{
                                        color: status === "Отрицательный" ? "red" : status === "С подозрением" ? "orange" : "inherit",
                                    }}
                                >
                                    {status}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/inquirer?userId=${result.user_id}&passnum=${result.pass_num}`}
                                          component={RouterLink}
                                    >
                                        Подробнее
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SummaryTable;
