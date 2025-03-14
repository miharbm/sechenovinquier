import {useNavigate} from "react-router-dom";
import {getInfoColor, getResultStatus} from "../../util/util.js";
import Tooltip from "@mui/material/Tooltip";

const ChartItem = ({data}) => {
    const {
        user_id,
        first_name,
        last_name,
        quiz_id,
        user_score,
        is_failed,
        pass_num,
        pass_time
    } = data || {};

    const navigate = useNavigate();


    const status = getResultStatus(is_failed, user_score);
    const color = getInfoColor(status)

    const date = new Date(pass_time).toLocaleString()


    const handleClick = () => {
        navigate(`/inquirer?userId=${user_id}&passnum=${pass_num}&quizId=${quiz_id}`);
    }

    return (
        <Tooltip title={
            <div>
                <div><strong>Дата:</strong> { date }</div>
                <div><strong>Статус:</strong> {status}</div>
                <div><strong>Quiz ID:</strong> {quiz_id}</div>
            </div>
        }
                 placement="top"
                 arrow
        >
            <div className={"chart__item"}
                 style={{backgroundColor: color}}
                 onClick={handleClick}
            />
        </Tooltip>
    )
}

export default ChartItem