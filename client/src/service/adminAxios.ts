import axios from "axios";
import config from "@/config";
import { removeAdmin } from "@/lib/features/users/adminSlice";
import { store } from "@/lib/store";

const ADMINAPI = axios.create({
    baseURL: 'https://atomica.live',
    headers: {
        "Content-Type": "application/json",
        "withCredentials": true,
    },
});

// Add request interceptor
ADMINAPI.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("adminAccessToken");
        const refreshToken = localStorage.getItem("adminRefreshToken");
        const role = localStorage.getItem("adminRole");
        const verifyToken = localStorage.getItem("adminVerifyToken");

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            config.headers["x-refresh-token"] = refreshToken;
        }
        if (role) {
            config.headers["x-user-role"] = role;
        }
        if (verifyToken) {
            config.headers["x-verify-token"] = verifyToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


ADMINAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { data, status } = error.response;

            console.log("Error message:", data.message);
            console.log("Error details:", data);

            if (status === 401 && data.message == 'ACCESS FORBIDDEN' ) {

                localStorage.removeItem("adminAccessToken");
                localStorage.removeItem("adminRefreshToken");
                localStorage.removeItem("adminRole");
                localStorage.removeItem("adminVerifyToken");
                localStorage.removeItem('admin')

                store.dispatch(removeAdmin()); 
                window.location.href = "/admin"; 
            }
        } else {
            console.error("Unknown error:", error);
        }
        return Promise.reject(error);
    }
);

export default ADMINAPI;
