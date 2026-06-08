import { getToken } from "../utils/LocalStorage";
import { api } from "./api";

export const getAllBarbers = async () => {

    const token = getToken();

    try {
        const res = await api("/barbers" , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res);

        return res;
        
    } catch (err) {
        console.log(err);
        
    }
} 