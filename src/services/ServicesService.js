import { getToken } from "../utils/LocalStorage.js";
import { api } from "./api.js";

export const getAllServices = async () => {
    const token = getToken();
    try {
        const response = await api('/services', {
            headers: {
                Authorization: `BEARER ${token}`
            }
        });

        return response;
    } catch (err) {
        console.log(err);
    }
}