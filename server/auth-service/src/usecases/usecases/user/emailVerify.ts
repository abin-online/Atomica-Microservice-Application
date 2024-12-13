import { Next } from "../../../framework/types/serverTypes";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middlewares/errorHandler";

export const emailVerify = async (otpRepository: IotpRepository, userRepository: IuserRepository, email: string, otp: string, next: Next) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user) return next(new ErrorHandler(400, 'invalid email id'))

        const result = await otpRepository.findOtp(user.email)
        if (!result) return next(new ErrorHandler(400, 'otp expried'))
        if (result.otp !== otp) return next(new ErrorHandler(400, 'invalid otp'))
        return { message: 'the otp verify success ! ..now you can add new password' }


    } catch (error) {
        throw error
    }
}