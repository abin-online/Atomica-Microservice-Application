import ErrorHandler from "../../../../../../usecases/middlewares/errorHandler";
import userModel from "../../../model/userModel";

export const block = async (id: string, userModels: typeof userModel) => {
    try {
        const user = await userModels.findById(id)
        if (user) {
            user.is_blocked = !user.is_blocked
            const blockResult = await user.save()
            return blockResult
        } else {
            console.log('user not found')
        }
    } catch (error) {
        throw error
    }
}