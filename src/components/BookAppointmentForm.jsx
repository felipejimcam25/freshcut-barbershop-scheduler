import { useEffect, useState } from "react";
import { getAvailableSpaces } from "../services/availabilityService";
import { getAllBarbers } from "../services/barberService";

import '../styles/BookForm.css'
import CloseIcon from "./icons/CloseIcon";
import { getAllServices } from "../services/ServicesService";
import CreateAppointmentBtn from "./CreateAppointmentBtn";
import { createAppointment } from "../services/appointmentService";
import { getItem } from "../utils/LocalStorage";

export default function BookAppointemntForm ({date}) {

    const [ slots, setSlots ] = useState([]);

    const [ barbers, setBarbers ] = useState([]);

    const [ isOpen, setIsOpen ] = useState(false);

    const [ services, setServices ] = useState([]);

    const [ selectedSlot, setSelectedSlot ] = useState('');

    
    const fetchSlots = async() =>{
        try {
            const response = await getAvailableSpaces(date);
    
            console.log(response);
            const slots = response.data?.data;
            console.log("Slots: ", slots);

            setSlots(slots);
            setIsOpen(true);
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

        fetchSlots();
        fetchBarbers()
        fetchServices();
    }, [date]);





    console.log(services);
    

    const handleClose = () => {
        setIsOpen(false)
    }


    const [form, setForm] = useState({
        date: '',
        start_time: '',
        service_id : '',
        barber: ''
    });

    const handleSubmitAppointment = async () => {
        
        const userId = getItem('userID');

        const data = {
            client_id: Number(userId),
            date: date,
            start_time: form.start_time,
            service_id: form.service_id,
            barber: form.barber
        }
        try {
            console.log(data);
            
            const res = await createAppointment(data);
            console.log(res);

            
            
        } catch (err) {
            console.log(err);
            
        }

        setIsOpen(false);

    }

    console.log(barbers);

    
    

    return (
        <div className={`appointmentModal ${isOpen ? 'active' : ""}`}>
            <div className="closeModalBtn">
                <button className="closeModal" onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
            <form action="" className="appointemntForm" onSubmit={(e) => {
                e.preventDefault()
                handleSubmitAppointment()
            } 
            }>
                <div className="formControl">
                    <label htmlFor="barber">Barber</label>
                <select name="barber" id="barber" onChange={(e) => 
                    setForm({
                        ...form,
                        barber: e.target.value
                    })}
                >
                        <option value="">Select a barber</option>
                        {barbers.map(( barber ) => {
                            return (
                                <option key={ barber.id } value={ barber.id }>{ barber.name }</option>
                            )
                        })}
                    </select>
                </div>
                <div className="formControl">
                    <label htmlFor="service">Service</label>
                    <select name="service" id="service" onChange={(e) => 
                        setForm({
                            ...form,
                            service_id: e.target.value
                        })}
                    >
                        <option value="">Select a service</option>
                        {services.map(( service ) => {
                            return (
                                <option key={ service.id } value={ service.id }>{ service.name }</option>
                            )
                        })}
                    </select>
                </div>
                <div className="formControl">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" value={date} disabled  />
                </div>
                <div className="formControl">
                    <label htmlFor="hour">Available Slots</label>
                    <div className="slotsContainer">
                        
                    {slots.map((slot, index) => (
                        <div className={` slot ${ selectedSlot === slot.start ? 'selected' : '' } `} key={index} onClick={() => setSelectedSlot(slot.start)}>
                        <input type="button" id={index} value={slot.start} onClick={( ) => 
                            setForm({
                                ...form,
                                start_time: slot.start
                            })
                        }/>
                        <span>{slot.start <= '12:00' ? 'Morning' : slot.start < '18:00' ? 'Afternoon' : 'Evening'}</span>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="ButonContainer">
                    <CreateAppointmentBtn />
                </div>
            </form>
        </div>
    )
}