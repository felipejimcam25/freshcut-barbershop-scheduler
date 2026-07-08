import { useEffect, useState } from "react";
import { getAvailableSpaces } from "../services/availabilityService";
import { getAllBarbers } from "../services/barberService";

import '../styles/BookForm.css'
import CloseIcon from "./icons/CloseIcon";
import { getAllServices } from "../services/ServicesService";
import CreateAppointmentBtn from "./CreateAppointmentBtn";
import { createAppointment } from "../services/appointmentService";
import { getItem } from "../utils/LocalStorage";
import ErrorIcon from "./icons/ErrorIcon";
import { useAlert } from "../hooks/useAlert";
import SuccessIcon from "./icons/SuccessIcon";
import PrevIcon from "./icons/PrevIcon";
import NextIcon from "./icons/NextIcon";

export default function BookAppointemntForm ({date}) {

    const [ slots, setSlots ] = useState([]);

    const [ barbers, setBarbers ] = useState([]);

    const [ isOpen, setIsOpen ] = useState(false);

    const [ services, setServices ] = useState([]);

    const [ selectedSlot, setSelectedSlot ] = useState('');

    
    const [ totalPages, setTotalPages ] = useState(1)

    const { showAlert } = useAlert();
    
    const [ page, setPage ] = useState(1);

    const fetchSlots = async(currentPage) =>{
        try {
            const response = await getAvailableSpaces(date, currentPage);
    
            console.log("RESPONSE: ", response);
            const slots = response.data.result.available;
            console.log("Slots: ", slots);

            setTotalPages(response.data.result.totalPages)

            setSlots(slots);
            setIsOpen(true);
        } catch (err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        console.log("PAGE UPDATED: ", page);
        
        fetchSlots(page)
    }, [date, page])

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

    //PAGINATION FUNCTIONS

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(page <= 1) return;
        setPage(prev => {
            console.log("SETTING PAGE TO:", prev - 1);
            return prev - 1
        })
    }
    const handleNext = () => {
        console.log("BEFORE", page);
        console.log("totalPages", totalPages);
        if (page >= totalPages) return;
        setPage(prev => prev + 1);
        console.log("PAGE", page);
    }

    
    

    const handleSubmitAppointment = async (e) => {
        e.preventDefault();

        const userId = getItem('userID');

        const data = {
            client_id: Number(userId),
            date: date,
            start_time: form.start_time,
            service_id: Number(form.service_id),
            barber: Number(form.barber)
        }

        console.log(data);
        

        if(data.client_id === '' || data.date === '' || data.start_time === '' || data.barber === '' || data.service_id === '') {
            showAlert(
                "Empty Fields! Please fill out the form to continue",
                "error active",
                <ErrorIcon />
            )
            return;
        } else {

            try {
                console.log(data);
                
                const res = await createAppointment(data);
                console.log(res);
    
                showAlert(
                    `Appointment Schedule on ${res.data.data.date.split("T")[0]} at ${res.data.data.start_time}`,
                    "success active",
                    <SuccessIcon />
                )
                
            } catch (err) {
                showAlert(
                    `${err.res.data.message}`,
                    "error active",
                    <ErrorIcon />
                )
                
            }
    
            setIsOpen(false);
        }
    
        console.log(barbers);
        }


    
    

    return (
            <div className={`appointmentModal ${isOpen ? 'active' : ""}`}>
                <div className="closeModalBtn">
                    <button className="closeModal" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form action="" className="appointemntForm" onSubmit={(e) => {
                    handleSubmitAppointment(e)
                }
                }>
                    <div className="formControl">
                        <label htmlFor="barber">Barber</label>
                    <select className="bookInput" name="barber" id="barber" onChange={(e) => 
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
                        <select className="bookInput" name="service" id="service" onChange={(e) => 
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
                        <input className="bookInput" type="date" id="date" value={date} disabled  />
                    </div>
                    <div className="formControl">
                        <label htmlFor="hour">Available Slots</label>
                        <div className="pagination">
                            <span className="pagetext">
                                Page: { page } / { totalPages }
                            </span>
                            <div className="paginationButtons" disabled={page <= 1 ? true : false}>
                                <button className="prev" onClick={handlePrev} type="button">
                                    <PrevIcon />
                                </button>
                                <button type="button" className="next" disabled={page >= totalPages ? true : false} onClick={handleNext}>
                                    <NextIcon />
                                </button>
                            </div>
                        </div>
                        <div className="slotsContainer">
                            
                        {slots.map((slot, index) => (
                            <div className={` slot ${ selectedSlot === slot.start ? 'selected' : '' } `} key={index} onClick={() => setSelectedSlot(slot.start)}>
                            <input className="bookInput" type="button" id={index} value={slot.start} onClick={( ) => 
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