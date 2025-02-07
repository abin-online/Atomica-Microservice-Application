import { Next } from "../../../framework/types/serverTypes";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middlewares/errorHandler";

export const updateUserPassword = async (userRepository: IuserRepository, hashPassword: IhashPassword, email: string, password: string, next: Next) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user) return next(new ErrorHandler(400, 'invalid User'))
        const bycrpt = await hashPassword.createHash(password as string)
        await userRepository.changePassword(email, bycrpt)
        return { message: 'password update succes' }
    } catch (error) {
        throw error
    }

}