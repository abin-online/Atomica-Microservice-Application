import { Next } from "../../../framework/types/serverTypes";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";

export const blockUser= async(userId:string,userRepository:IuserRepository,next:Next)=>{
    try {
        return await userRepository.blockUser(userId)
    } catch (error) {
        throw error
    }
}