export const extendDate = (date, days: number = 2) => {
    let result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

export const getFormattedDate = (date = null) => {
    const dateObj = date ? new Date(date) : new Date();
    return dateObj;
}