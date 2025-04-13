import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import IconButton from "@mui/material/IconButton";
import {useMarkResultAsViewedMutation} from "../../../api/adminApi.js";
import Tooltip from "@mui/material/Tooltip";
import {infoColors} from "../../../styles/theme.js";
import Box from "@mui/material/Box";

const ViewedCell = ({isViewed, rowValues}) => {
    const {userId, passNum, quizId} = rowValues;
    const [markAsViewed] = useMarkResultAsViewedMutation()

    const handleView = (isViewed) => () => {
        markAsViewed({
            patientId: userId,
            passNum: passNum,
            quizId: quizId,
            isViewed: isViewed
        })
    }

    return (
        <Box display="flex" justifyContent="center" mr={"25px"}>
            {isViewed ? (
                <Tooltip title="Отменить просмотр">
                    <IconButton onClick={handleView(false)}>
                        <VisibilityIcon style={{color: infoColors.ok}}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Сделать просмотренным">
                    <IconButton onClick={handleView(true)}>
                        <VisibilityOffIcon style={{color: "#9e9e9e"}}/>
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}

export default ViewedCell;