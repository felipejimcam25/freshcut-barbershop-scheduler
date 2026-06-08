import { useState } from 'react';
import '../styles/Alerts.css'

import CloseIcon from './icons/CloseIcon';
import SuccessIcon from './icons/SuccessIcon';

function SuccessAlert ({ message }) {

    const [ showAlert, setShowAlert ] = useState(true);

    return (
        <>
            {showAlert && (
                <div className={`successAlert ${showAlert ? "show" : 'successAlert'}`}>
                    <div className="icon">
                        <SuccessIcon />
                    </div>
                    <span>{message}</span>
                    <div className="closeAlert" onClick={() => setShowAlert(false)}>
                        <CloseIcon />
                    </div>
                </div>
            )}
        </>
    )
}

export default SuccessAlert;