
import { Next } from "../../../framework/types/serverTypes";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";
import ErrorHandler from "../../middlewares/errorHandler";

export const forgotPassword = async (sentEmail: IsentEmail, otpRepository: IotpRepository, OtpGenerate: IotpGenerate, userRepository: IuserRepository, email: string, next: Next) => {
    try {

        const user = await userRepository.findByEmail(email)
        if (!user) return next(new ErrorHandler(400, 'invalid email id'))
        const otp = await OtpGenerate.createOtp()
        await otpRepository.createOtp(user.email, otp)
        await sentEmail.sentEmailVerification(user.name, user.email, otp)
        return { message: 'otp sent succesfully' }
    } catch (error) {
        throw error
    }

}