export const DateConvert = (date) => {
    

    const d = new Date(date);

    const month = d.toLocaleString("en-US", { month: 'short' });

    const day = d.getDate();

    return {
        month, day
    }
}

export const getAmPm = (time) => {
    if(!time) return "";
    
    const hour = Number(time.split(':')[0]);

    return hour >= 12 ? "PM" : "AM";
}