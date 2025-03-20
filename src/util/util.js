export const validateEmail = (email) => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        "Отрицательный" : "red",
        "С подозрением" : "orange",
        "Положительный" : "green"
    }

    return statuses[status]
}