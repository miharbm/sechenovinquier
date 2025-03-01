import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";

const InquiererDetailsTableBodySkeleton = () => {
    return (
        <TableBody>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton width={250} /></TableCell>
                    <TableCell><Skeleton width={200} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default InquiererDetailsTableBodySkeleton;