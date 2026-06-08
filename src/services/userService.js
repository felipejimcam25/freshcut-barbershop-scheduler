import { api } from "./api";
import { getToken } from "../utils/LocalStorage";

export const getAppointmentByUser = () => {
    const token = getToken();
    
    return api.get('/appointments/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}