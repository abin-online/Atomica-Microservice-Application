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
        const response = await API.post(userRoutes.resendOtp , {email})
        return response.data
    } catch (error) {
        return error
    }
}

export const logOut = async () => {
    try {
        
        const response = await API.post(userRoutes.logOut)
        localStorage.removeItem("accesToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("verifyToken");
        localStorage.removeItem('user')
        return response.data

    } catch (error) {
        return error
    }
}

export const forgotPassword = async (email : string)=> {
    try {
        const response = await API.post(userRoutes.forgotPassword, {email})
        return response.data
    } catch (error) {
        return error
    }
}

export const verifyForgotOtp = async (otp : string, email: string)=> {
    try {
        const response = await API.post(userRoutes.createPassword, {otp, email});
        return response
    } catch (error) {
        return error
    }
}

export const resetPassword = async (email : string, password: string)=> {
    try {
        const response = await API.post(userRoutes.resetPassword, {email, password})
        return response
    } catch (error) {
        
    }
}