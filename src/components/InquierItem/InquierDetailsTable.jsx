import Typography from '@mui/material/Typography';
import { useGetInquierItemQuery } from "../../api/api.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const InquierDetailsTable = ({ userId, passNum }) => {
    console.log("Props:", { userId, passNum });

    const { data, isLoading, error } = useGetInquierItemQuery({ userId, passNum });

    if (isLoading) return <Typography>Загрузка...</Typography>;
    if (error) return <Typography>Ошибка загрузки данных</Typography>;
    if (!data || !data.responses || data.responses.length === 0) {
        return <Typography>Нет данных для отображения</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800, mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Вопрос</strong></TableCell>
                        <TableCell><strong>Ответ</strong></TableCell>
                        <TableCell><strong>Баллы</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.responses.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.question_text}</TableCell>
                            <TableCell>{item.answer_text}</TableCell>
                            <TableCell>{item.response_score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InquierDetailsTable;
