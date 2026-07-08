import { useAlert } from "../hooks/useAlert";
import Alert from "./Alert";

export default function GlobalAlert() {

    const { alert, hideAlert } = useAlert();

    console.log(alert);
    

    if(!alert.show) return null;

    return (
        <Alert 
            message={alert.message}
            className={alert.type}
            icon={alert.icon}
            onClose={hideAlert}
        />
    )

} 