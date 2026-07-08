import { useState } from "react";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({ children }) => {
    const [ alert, setAlert ] = useState({
        show: false,
        message: "",
        type: "",
        icon: null
    })

    const showAlert = (message, type = "success", icon) => {
        setAlert({
            show: true,
            message,
            type,
            icon
        })
    }

    const hideAlert = () => {
        setAlert({
            show: false,
            message: "",
            type: "",
            icon: null
        })
    }

    return (
        <AlertContext.Provider
            value={{
                alert,
                showAlert,
                hideAlert
            }}
        >
            {children}
            
        </AlertContext.Provider>
    )
}