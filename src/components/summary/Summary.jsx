import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import {useGetUsersResultsQuery} from "../../api/api.js";

const rows = [
    { id: 1, date: '2024-04-25 16:00', name: 'Иванов Иван', result: 'Положительный' },
    { id: 2, date: '2024-04-25 16:00', name: 'Иванов Иван', result: 'Положительный' },
    { id: 3, date: '2024-04-26 17:00', name: 'Петров Петр', result: 'Отрицательный' },
    { id: 4, date: '2024-04-25 16:00', name: 'Иванов Иван', result: 'Положительный' },
    { id: 5, date: '2024-04-26 17:00', name: 'Петров Петр', result: 'Отрицательный' },
    { id: 6, date: '2024-04-27 09:15', name: 'Сидоров Сидор', result: 'С подозрением' },
    { id: 7, date: '2024-04-25 16:00', name: 'Иванов Иван', result: 'Положительный' },
    { id: 8, date: '2024-04-27 09:15', name: 'Сидоров Сидор', result: 'С подозрением' },
];

const Summary = () => {
    const {data} = useGetUsersResultsQuery(undefined, undefined)

    console.log(data)

    return (
        <TableContainer component={Paper} style={{marginTop: '2rem'}}>
            <Typography variant="h5" gutterBottom component="div" style={{ padding: '16px' }}>
                Результаты тестирований
            </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                        <TableCell sx={{fontWeight: "bold"}}>Дата</TableCell>
                        <TableCell sx={{fontWeight: "bold"}}>Имя пациента</TableCell>
                        <TableCell sx={{fontWeight: "bold"}}>Результат</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell
                                style={{ color: row.result === "Отрицательный" ? "red" : row.result === "С подозрением" ? "orange" : "inherit"}}
                            >{row.result}</TableCell>
                            <TableCell>
                                <Link to={`/inquirer/${row.id}`} component={RouterLink} >Подробнее</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Summary;
