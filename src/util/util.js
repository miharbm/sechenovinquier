import {infoColors} from "../styles/theme.js";

export const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const RESULT_POSITIVE = "Положительный"
export const RESULT_NEGATIVE = "Отрицательный"
export const RESULT_SUSPICIOUS = "С подозрением"

export const getResultStatus = (isFailed, score) => {
    if (isFailed) return RESULT_NEGATIVE;
    if (score > 0) return RESULT_SUSPICIOUS;
    return RESULT_POSITIVE;
};

export const getInfoColor = (status) => {
    const statuses = {
        [RESULT_NEGATIVE] : infoColors.bad,
        [RESULT_SUSPICIOUS] : infoColors.warning,
        [RESULT_POSITIVE] : infoColors.ok,
    }

    return statuses[status]
}