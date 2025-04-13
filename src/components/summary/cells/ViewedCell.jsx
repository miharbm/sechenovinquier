import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import IconButton from "@mui/material/IconButton";
import {useMarkResultAsViewedMutation} from "../../../api/adminApi.js";
import Tooltip from "@mui/material/Tooltip";

const ViewedCell = ({isViewed, rowValues}) => {
    const {userId, passNum, quizId} = rowValues;
    const [markAsViewed] = useMarkResultAsViewedMutation()

    const handleView = () => {
        console.log("Viewed")
        markAsViewed({
            patientId: userId,
            passNum: passNum,
            quizId: quizId,
        })
    }

    return isViewed ? (
        <IconButton>
            <VisibilityIcon style={{ color: "#4caf50" }} />
        </IconButton>
        ) : (
        <Tooltip title="Сделать просмотренным">
            <IconButton onClick={handleView}>
                <VisibilityOffIcon style={{ color: "#9e9e9e" }} />
            </IconButton>
        </Tooltip>

    )
}

export default ViewedCell;