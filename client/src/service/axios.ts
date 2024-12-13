import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:4001/`,
    headers: {
        "Content-Type": 'application/json',
        "withCredentials": true
    }
})

API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accesToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('role');
    const verifyToken = localStorage.getItem("verifyToken")
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
    }
    if (role) {
        config.headers['x-user-role'] = role;
    }
    if (verifyToken) {
        config.headers['x-verify-token'] = verifyToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error)
})

API.interceptors.response.use(
    response => {

        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    },
);
export default API;