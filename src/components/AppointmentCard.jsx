import '../styles/Content.css';

import BaberImg from '../assets/images/barber/Barber Profile.png'
import { getAppointmentByUser } from '../services/userService';
import { useEffect, useState } from 'react';
import {DateConvert, getAmPm} from '../utils/DateConvert';
import getAppointmentStatus from '../utils/appointmentStatus';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import EditAppointmentForm from '../components/EditAppointmentForm';

function AppointmentCard ( ) {

    const [ message, setMessage ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ appointmentMessage, setAppointmentMessage ] = useState("");
    const [ appointment, setAppointment ] = useState(null);

    const [ isEditing, setIsEditing ] = useState(false);

    const handleEdit = async () => {
        setIsEditing(true);
    }

    console.log(appointment);
    
    useEffect(() => {

        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentByUser();

                console.log("response ", response);
                
                setAppointment(response.data.data);
                
                const appointmentStatus = getAppointmentStatus(response.data.data.date, response.data.data.start_time);

                if(appointmentStatus === "Upcoming" || appointmentStatus === "On Time") {
                    setAppointmentMessage('Next Appointment')
                } else {
                    setAppointmentMessage("Previous Appointment")
                }

                setStatus(appointmentStatus);

            } catch (err) {
                console.log(err.response.status);

                if(err.response?.status === 404) {
                    setMessage('No appointments found. Your appointment details will appear here.');
                    
                } else {
                    setMessage("Something went wrong");
                }
            }
        }

        fetchAppointments();

    }, []);

    console.log("Appointment: ", Array.isArray(appointment));

    return (
        <div className='container'>
            {isEditing && (
                <EditAppointmentForm
                    appointment={appointment}
                    onClose={() => setIsEditing(false)}

                />
            )}
            <div className="appointmentCard">
                {
                    message ? (
                        <span className='errorText'>{message}</span>
                    ) : (

                        <>
                        
                        <div className="cardHead">
                            <div className="nextAppoint">
                                <span>{ appointmentMessage }</span>
                            </div>
                            <div class="buttonsCard">

                            <button className='editBtn' onClick={handleEdit}>
                                <EditIcon />
                            </button>

                            <button className='deleteBtn'>
                                <DeleteIcon />
                            </button>
                            
                            </div>
        
                        </div>
        
                        { appointment && (
                        <>
                        <div className="dateDetails">
                            <span className='day'>
                                { DateConvert(appointment.date).month } { DateConvert(appointment.date).day }
                            </span>
                            <span className='hour'>at { appointment.start_time } {getAmPm(appointment.start_time)}</span>
                        </div>
        
                        <div className="barberInfo">
                            <img src={BaberImg} alt="Barber" className='barberProfile'/>
                            <div className="infoBox">
                                <span className='yourBarber'>YOUR BARBER</span>
                                <span className='barberName'>{appointment.barber_name}</span>
                            </div>
                        </div>
        
                        <div className="onTime">
                            <div className={`circle ${status.toLocaleLowerCase()}`}></div>
                            <span className={`status ${status.toLocaleLowerCase()}`}>{ status } </span>
                        </div>
                        </>
                        )}
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default AppointmentCard;