import API from "@/service/axios";
import adminRoutes from "./endPoints/admin";
import { loginData } from "@/@types/loginType";
import ADMINAPI from "@/service/adminAxios";



export const adminLogin = async (loginData: loginData) => {
    try {
        const response = await API.post(adminRoutes.login, loginData)
        console.log(response, 'from admin login')

        return response.data
    } catch (error: any) {
        return error
    }
}

export const adminLogout = async () => {
    try {
        const response = await ADMINAPI.post(adminRoutes.logout)
        return response.data
    } catch (error: any) {
        return error
    }
}


export const getUsersData = async () => {
    try {
        const users = await ADMINAPI.get(adminRoutes.getUsers)
        return users
    } catch (error: any) {
        return error
    }
}

export const blockUser = async (userId: string) => {
    try {
        console.log('Inside blockuser', userId)
        const response = await ADMINAPI.put(adminRoutes.blockUser, { userId })
        return response
    } catch (error: any) {
        return error
    }
}