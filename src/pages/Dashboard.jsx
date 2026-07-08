import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ContentHead from "../components/ContentHead";
import AppointmentCard from "../components/AppointmentCard";
import QuickBookButton from "../components/BookButton";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import SuccessIcon from "../components/icons/SuccessIcon";


function Dashboard() {
    
    const [showAlert, setShowAlert] = useState(true);

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const alertTime = setTimeout(() => {
            setShowAlert(false);
        }, 3000)

        const loaderTime = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            clearTimeout(alertTime);
            clearTimeout(loaderTime);
        }
        
    }, [])

    if(loading) {
        return  <Loader message="Welcome back! Preparing your FreshCut experience..." />
    }


    return (
        <>
            <Header />
            <ContentHead />
            <AppointmentCard />
            <QuickBookButton />
            <NavBar />

            {showAlert && (
                <Alert message="Welcome Back! You have successfully signed in." className="success" icon={<SuccessIcon/>} />
            )}

        </>
    )

}


export default Dashboard;