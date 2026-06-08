import axios from 'axios';
import { removeItem } from '../utils/LocalStorage';
import useAppNavigate from '../hooks/useNavigate';

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { goToLogin } = useAppNavigate();
        if(error.response?.status === 401) {
            removeItem("token")
            removeItem("user")
            removeItem("userID")
            goToLogin();
        }

        return Promise.reject(error);
    }
)