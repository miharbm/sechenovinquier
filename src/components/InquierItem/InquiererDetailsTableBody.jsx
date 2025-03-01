import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const InquiererDetailsTableBody = ({data}) => {
    return (
        <TableBody>
            {data.responses.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.question_text}</TableCell>
                    <TableCell>{item.answer_text}</TableCell>
                    <TableCell>{item.response_score}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default InquiererDetailsTableBody;