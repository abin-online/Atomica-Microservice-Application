import { Iuser } from "../../../../../../entities/user";
import userModel from "../../../model/userModel";

export const createUser = async (
    newUser: Iuser,
    userModels: typeof userModel): Promise<Iuser> => {
    try {
        const user = await userModels.create(newUser)
        await user.save()
        return user
    } catch (error) {
        throw error
    }
}