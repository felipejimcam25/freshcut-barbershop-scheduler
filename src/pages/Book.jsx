import { useState } from "react";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import BookAppointemntForm from "../components/BookAppointmentForm";

export default function Book () {

    const [ selectedDate, setSelectedDate ] = useState("");
    

    return (
        <section className="bookContainer container">
            <NavBar />
            <Calendar onDateSelect={setSelectedDate} />
            <BookAppointemntForm date={selectedDate}/>

        </section>
    )
}