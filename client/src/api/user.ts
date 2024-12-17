import { userData } from "@/@types/userData";
import API from "@/service/axios";
import userRoutes from "./endPoints/user";
import { loginData } from "@/@types/loginType";


export const signup = async (userData: userData) => {
    try {
        const response = await API.post(userRoutes.signup, userData)
        return response.data
    } catch (error: any) {
        return error
    }
}

export const verifyOTP = async (otp: string, email: string) => {
    try {
        const response = await API.post(userRoutes.verifyOTP, { otp, email })
        console.log(response)
        return response.data
    } catch (error: any) {
        return error
    }
}

export const login = async (loginData: loginData) => {
    try {
        const response = await API.post(userRoutes.login, loginData)
        return response.data
    } catch (error: any) {
        return error
    }
}

export const userGoogleLogin = async (loginData:object)=>{
    try {
        const response = await API.post(userRoutes.googleLogin, loginData)
        return response.data
    } catch (error:any) {
        return error
    }
}

export const resendOtp = async (email : string)=> {
    try {
        const response = await API.post(userRoutes.resendOtp , email)
        return response.data
    } catch (error) {
        return error
    }
}

export const logOut = async () => {
    try {
        
        const response = await API.post(userRoutes.logOut)
        return response.data

    } catch (error) {
        return error
    }
}