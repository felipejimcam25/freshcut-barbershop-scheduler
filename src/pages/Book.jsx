import { useState } from "react";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import BookAppointemntForm from "../components/BookAppointmentForm";
import Header from "../components/Header";

export default function Book () {

    const [ selectedDate, setSelectedDate ] = useState("");
    

    return (
        <>
            <Header />
            <NavBar />
        <section className="bookContainer container">
            <Calendar onDateSelect={setSelectedDate} />
            <BookAppointemntForm date={selectedDate}/>

        </section>
        </>
    )
}