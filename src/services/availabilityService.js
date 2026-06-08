import { getToken } from "../utils/LocalStorage";
import { api } from "./api";

export const getAvailableSpaces = async (date) => {
    const token = getToken();
    
    try {
        const res = await api(`/available-slots?date=${date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
        
    } catch (err) {
        console.log(err);
        
    }

}