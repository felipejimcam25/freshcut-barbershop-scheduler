import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import '../styles/BookForm.css';
import { useAlert } from "../hooks/useAlert";
import ErrorIcon from "./icons/ErrorIcon";


export default function Calendar({ onDateSelect }) {
    const { showAlert } = useAlert();
    
    const handleDateClick = (arg) => {
        
        const today = new Date();


        today.setHours(0, 0, 0, 0);

        if(arg.date < today) {
            showAlert(
                "Invalid Date. Please select a future date.",
                "error active",
                <ErrorIcon />
            )
            return;
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