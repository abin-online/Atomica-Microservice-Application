import ErrorHandler from "../../../../../../usecases/middlewares/errorHandler";
import userModel from "../../../model/userModel";

export const block = async (id: string, userModels: typeof userModel) => {
    try {
        const user = await userModels.findById(id)
        console.log("repo block ------>",user)
        if (user) {
            user.is_blocked = !user.is_blocked
            const blockResult = await user.save()
            console.log(blockResult)
            return blockResult
        } else {
            console.log('user not found')
        }
    } catch (error) {
        throw error
    }
}