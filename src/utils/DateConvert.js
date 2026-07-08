export const DateConvert = (date) => {
    
    const [year, month, day] = date.split('T')[0].split('-');

    const monthName = new Date(
        Number(year),
        Number(month) - 1,
        1
    ).toLocaleString("en-US", { month: "short" });

    return {
        month: monthName,
        day: Number(day)
    };
}

export const getAmPm = (time) => {
    if(!time) return "";
    
    const hour = Number(time.split(':')[0]);

    return hour >= 12 ? "PM" : "AM";
}