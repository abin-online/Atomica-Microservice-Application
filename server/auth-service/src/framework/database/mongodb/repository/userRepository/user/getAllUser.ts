import { Iuser } from "../../../../../../entities/user";
import userModel from "../../../model/userModel";

export const getAllUser = async (userModels: typeof userModel): Promise<Iuser[] | void> => {
    try {
        return await userModels.find()
    } catch (error) {
        throw error
    }
}