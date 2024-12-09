import userModel from "../../../model/userModel";
import { Iuser } from "../../../../../../entities/user";
import ErrorHandler from "../../../../../../usecases/middlewares/errorHandler";

export const findByEmail = async (userModels: typeof userModel, email: string): Promise<Iuser | void> => {
    let result = await userModels.findOne({ email })
    if (result) {
        return result
    }
}