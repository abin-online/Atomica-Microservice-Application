import { Model, Document } from "mongoose";
import { Iuser } from "../../../../../../entities/user";
import userModel from "../../../model/userModel";


export const getUser = async (userModels: Model<Iuser, {}, {}, {}, Document<unknown, {}, Iuser> & Iuser & Required<{ _id: string; }>, any>, id: string): Promise<Iuser | undefined> => {
    try {
        const user = await userModel.findById(id)
        return user ? user : undefined
    } catch (error) {
        throw error
    }
}