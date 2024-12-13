import adminModel from "../../../model/admin";
import { Iadmin } from "../../../../../../entities/admin";

export const findbyEmail = async (adminModels:typeof adminModel,email:string)=>{
    try {
        const admin = await adminModels.findOne({email})
        return admin ? admin:undefined
    } catch (error) {
        throw error
    }
}