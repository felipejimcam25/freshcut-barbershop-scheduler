import CloseIcon from "./icons/CloseIcon";
import '../styles/Alerts.css'

export default function Alert ( { message, className, icon, onClose } ) {

    console.log(message, className, icon, onClose);
    
    return (
        <div className={`alert ${className}`}>
            <div className="infoAlert">
                <div> { icon } </div>
                <span> { message } </span>
            </div>
            <div className="close" onClick={onClose}>
                <CloseIcon />
            </div>
        </div>
    )
}