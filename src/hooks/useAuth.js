import { login } from '../services/authService.js';

export function userAuth() {

    const handleLogin = async (identifier, password) => {
        try {
            const response = await login({
                identifier,
                password
            });
            
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return {
        handleLogin
    }
}