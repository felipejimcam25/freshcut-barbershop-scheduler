import NavBar from "../components/NavBar";
import SuccessAlert from "../components/SuccessAlert";
import Header from "../components/Header";
import ContentHead from "../components/ContentHead";
import AppointmentCard from "../components/AppointmentCard";
import QuickBookButton from "../components/BookButton";
import { useState } from "react";

function Dashboard() {
    
    const [showAlert, setShowAlert] = useState(true);

    setTimeout(() => {
        setShowAlert(false);
    }, 3000)

    return (
        <>
            <Header />
            <ContentHead />
            <AppointmentCard />
            <QuickBookButton />
            <NavBar />

            {showAlert && (
                <SuccessAlert message="Welcome Back! You have successfully signed in." />
            )}

        </>
    )

}


export default Dashboard;