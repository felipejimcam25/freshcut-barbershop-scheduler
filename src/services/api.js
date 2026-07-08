import axios from 'axios';
import { removeItem } from '../utils/LocalStorage';

export const api = axios.create({
    baseURL: "https://appointment-web-app-api.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            removeItem("token")
            removeItem("user")
            removeItem("userID")
        }

        return Promise.reject(error);
    }
)