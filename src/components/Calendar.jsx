import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import '../styles/BookForm.css';


export default function Calendar({ onDateSelect }) {
    
    const handleDateClick = (arg) => {
        
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if(arg.date < today) {
            return alert('Error past Day');
        }

        onDateSelect(arg.dateStr);
    }
    

    return (
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
        />
    )
}