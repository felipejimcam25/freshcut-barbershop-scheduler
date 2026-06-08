export default function getAppointmentStatus (date, time) {

    console.log("DATE: ", date, "TIME: ", time);

    const dateFormat = date.split('T');
    
    
    
    const now = new Date();

    const appointmentDate = new Date(`${dateFormat[0]}T${time}`);
    console.log(appointmentDate);
    
    
    const diffMinutes = (appointmentDate - now) / 1000 / 60;

    //appointment already passed
    if(diffMinutes < -60) {
        return "Completed"
    }


    if(diffMinutes >= 0 && diffMinutes <= 0) {
        return "On Time"
    }

    return "Upcoming"

    
} 