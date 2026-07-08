import { useEffect, useState } from "react";
import { getAvailableSpaces } from "../services/availabilityService";
import { getAllBarbers } from "../services/barberService";
import { getAllServices } from "../services/ServicesService";

import CreateAppointmentBtn from "./CreateAppointmentBtn";
import { useAlert } from "../hooks/useAlert";
import ErrorIcon from "./icons/ErrorIcon";
import { editAppointment } from "../services/appointmentService";

export default function EditAppointmentForm({ appointment, onClose }) {

    const { showAlert } = useAlert();

    const [ slots, setSlots ] = useState([]);
    const [ date, setDate ] = useState('');
    const [ barbers, setBarbers ] = useState([]);
    const [ services , setServices ] = useState([]);
    const [ selectedSlot, setSelectedSlot ] = useState(false);
    const [form, setForm] = useState({
        date: '',
        start_time: '',
        service_id : '',
        barber: ''
    });

    console.log(appointment);
    

        const fetchSlots = async() =>{
            
            try {
                const response = await getAvailableSpaces(date);
        
                console.log(response);
                const slots = response.data?.data;
                console.log("Slots: ", slots);
    
                setSlots(slots);
            } catch (err) {
                console.log(err);
            } 
        }
    
        const fetchBarbers = async () => {
                try {
                    const response = await getAllBarbers();
    
                    setBarbers(response.data.data)
                    
                } catch (err) {
                    console.log(err);
                }
            }
    
            const fetchServices = async () =>  {
                try {
                    const response = await getAllServices();
    
                    console.log('Services', response);
                    
                    setServices(response.data.data)
                } catch (err) {
                    console.log(err);
                    
                }
            }

            useEffect(() => {
                if(appointment && !date) {
                    setDate(appointment.date.split('T')[0]);
                }
            }, [appointment]);
    
            useEffect(() => {
                fetchBarbers()
                fetchServices();
            }, []);
    
        useEffect(() => {
            console.log('Date Changed', date);
            
            if(!date) return
    
            fetchSlots();
        }, [date]);
        console.log(appointment.id);
        
        const data = {
            id: Number(appointment.id),
            barber: Number(form.barber),
            service_id: Number(form.service_id),
            date: form.date,
            start_time: form.start_time
        }

        const handleSubmitEdit = async (e) => {
            e.preventDefault();

            try {
                const res = await editAppointment(data);

                console.log(res);
                
            } catch (err) {
                console.log(err);
                showAlert(
                    `${err.res.data.message}`,
                    'error active',
                    <ErrorIcon />
                )
                
            }

        }

    return (
        <form className="editFormContainer" onSubmit={(e) => handleSubmitEdit(e)}>
            <div className="formControl">
                <label htmlFor="barber">Barber</label>
                <select name="barber" id="barber" onChange={(e) => setForm({
                    ...form,
                    barber: e.target.value
                })}>
                    {barbers.map(( barber ) => {
                        return (
                            <option key={ barber.id } value={ barber.id } selected={barber.name === appointment.barber_name}>{ barber.name }</option>
                        )
                    })}
                </select>
            </div>
            <div className="formControl">
                <label htmlFor="service">Service</label>
                <select name="service" id="service" onChange={(e) => setForm({
                    ...form,
                    service_id: e.target.value
                })}>
                    {services.map(( service ) => {
                        return (
                            <option key={ service.id } value={ service.id } selected={service.name === appointment.service_name}>{ service.name }</option>
                        )
                    })}
                </select>
            </div>
            <div className="formControl">
                <label htmlFor="date">date</label>
                <input type="date" id="date" value={date} onChange={(e) => {
                    setDate(e.target.value);
                    setForm({
                    ...form,
                        date: e.target.value
                    })
                }}/>
            </div>
            <div className="formControl">
                <label htmlFor="slots">Available Slots</label>
                {slots.map((slot, index) => (
                    <div className={` slot ${ selectedSlot === slot.start ? 'selected' : '' } `} key={index} onClick={() => setSelectedSlot(slot.start)}>
                    <input className="bookInput" type="button" id={index} value={slot.start} onClick={(e) => setForm({
                    ...form,
                    start_time: e.target.value
                })}/>
                    <span>{slot.start <= '12:00' ? 'Morning' : slot.start < '18:00' ? 'Afternoon' : 'Evening'}</span>
                    </div>
                ))}
            </div>
            <div className="actionsEdit">
                <CreateAppointmentBtn />
            </div>

        </form>
    )
}