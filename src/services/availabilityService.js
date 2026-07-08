import { getToken } from "../utils/LocalStorage";
import { api } from "./api";

export const getAvailableSpaces = async (date, page) => {
    const token = getToken();

    console.log("DATE: ", date, " PAGE: ", page);
    
    
    try {
        const URL = `/available-slots?date=${date}`;

        const res = await api(`${URL}&page=${page}&limit=5`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
        
    } catch (err) {
        console.log(err.response?.data || err.message);
        throw err
        
    }

}