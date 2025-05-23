import Typography from '@mui/material/Typography';
import { useGetInquierItemQuery } from "../../api/userApi.js";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InquiererDetailsTableBody from "./InquiererDetailsTableBody.jsx";
import InquiererDetailsTableBodySkeleton from "./InquiererDetailsTableBodySkeleton.jsx";
import ErrorBlock from "../badstatuses/ErrorBlock.jsx";

const InquierDetailsTable = ({ userId, passNum, quizId }) => {
    const {
        data,
        isLoading,
        error
    } = useGetInquierItemQuery({ userId, passNum, quizId });

    if (error) return <ErrorBlock/>;

    return (
        <TableContainer sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Вопрос</strong></TableCell>
                        <TableCell><strong>Ответ</strong></TableCell>
                        <TableCell><strong>Баллы</strong></TableCell>
                    </TableRow>
                </TableHead>
                {data?.responses && <InquiererDetailsTableBody data={data}/>}
                {isLoading && <InquiererDetailsTableBodySkeleton/>}
            </Table>
        </TableContainer>
    );
}

export default InquierDetailsTable;
