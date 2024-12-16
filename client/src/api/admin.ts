import API from "@/service/axios";
import adminRoutes from "./endPoints/admin";

export const getUsersData = async () => {
    try {
        const users = await API.get(adminRoutes.getUsers)
        return users
    } catch (error : any) {
        return error
    }
}

export const blockUser = async (userId : string) => {
    try {
        console.log('Inside blockuser', userId)
        const response = await API.put(adminRoutes.blockUser , {userId})
        return response
    } catch (error : any) {
        return error
    }
}