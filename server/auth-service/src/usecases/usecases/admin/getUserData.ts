
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";

export const getUserData = async(userRepository:IuserRepository)=>{
    try {
        return await userRepository.getAllUser()
    } catch (error) {
        throw error
    }
}