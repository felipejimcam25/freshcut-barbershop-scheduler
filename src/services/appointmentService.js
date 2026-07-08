import { getToken } from "../utils/LocalStorage"
import { api } from "./api"

const token = getToken();

export const createAppointment = async (data) => {
    console.log("DATA ON SERVICE:", data);
    try {
        const response = await api.post('/appointments', data, {
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
    
        return response;

    } catch (err) {
        console.log(err);
    }

}

export const editAppointment = async (data) => {
    try {
        const response = await api.put(`/appointments/${data.id}`, data, {
            headers: {
                Authorization: `BEARER ${token}`
            }
        });

        return response;
    } catch (err) {
        console.log(err);
        
    }
} 