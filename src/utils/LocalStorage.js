export const getToken = () => {
    return localStorage.getItem('token');
}

export const removeItem = (key) => {
    return localStorage.removeItem(key);
}

export const setItem = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
    return localStorage.getItem(key);
}