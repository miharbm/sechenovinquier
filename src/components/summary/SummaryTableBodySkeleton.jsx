import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";

const SummaryTableBody = () => {

    return (
        [...Array(5)].map((_, index) => (
            <TableRow key={index}>
                <TableCell><Skeleton width={30} /></TableCell>
                <TableCell><Skeleton width={100} /></TableCell>
                <TableCell><Skeleton width={150} /></TableCell>
                <TableCell><Skeleton width={120} /></TableCell>
                <TableCell><Skeleton width={80} /></TableCell>
            </TableRow>
        ))
    )
}

export default SummaryTableBody