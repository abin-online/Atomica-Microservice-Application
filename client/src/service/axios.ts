import axios from "axios";
import config from "@/config";
import { removeUser } from "@/lib/features/users/userSlice";
import { store } from "@/lib/store";
const USERAPI = axios.create({
    baseURL: 'https://atomica.live',
    headers: {
        "Content-Type": 'application/json',
        "withCredentials": true
    }
})

USERAPI.interceptors.request.use((config) => {
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

USERAPI.interceptors.response.use(
    response => {

        return response;
    },
    (error) => {
        if (error.response) {
            const { data, status } = error.response;

            console.log("Error message:", data.message);
            console.log("Error details:", data);

            if (status === 401 && data.message == 'ACCESS FORBIDDEN' ) {

                localStorage.removeItem("accesToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                localStorage.removeItem("verifyToken");
                localStorage.removeItem('user')

                store.dispatch(removeUser()); 
                window.location.href = "/login"; 
            }
            return error.response
        } else {
            console.error("Unknown error:", error);
        }
        return Promise.reject(error);
    }
);
export default USERAPI;

