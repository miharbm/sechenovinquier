import {infoColors} from "../styles/theme.js";

export const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const getResultStatus = (isFailed, score) => {
    if (isFailed) return "Положительный";
    if (score > 0) return "С подозрением";
    return "Отрицательный";
};

export const getInfoColor = (status) => {
    const statuses = {
        "Отрицательный" : infoColors.bad,
        "С подозрением" : infoColors.warning,
        "Положительный" : infoColors.ok,
    }

    return statuses[status]
}