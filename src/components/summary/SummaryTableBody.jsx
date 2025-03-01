import dayjs from "dayjs";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import TableBody from "@mui/material/TableBody";

const getResultStatus = (isFailed, score) => {
    if (isFailed) return "Положительный";
    if (score > 0) return "С подозрением";
    return "Отрицательный";
};

const SummaryTableBody = ({data}) => {

    return (
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
    )
}

export default SummaryTableBody;