import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverTypes";
import { IJwt } from "../../interface/service/jwt";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import ErrorHandler from "../../middlewares/errorHandler";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { catchError } from "../../middlewares/catchError";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IsentEmail } from "../../interface/service/sentEmail";

export const userSignup = async (jwt : IJwt, otpRepository: IotpRepository, userRepository: IuserRepository,otpGenerate:IotpGenerate, hashPassword:IhashPassword, user: Iuser, sentEmail:IsentEmail,  next: Next) : Promise <string | void> => {
    try {
        const userExist = await userRepository.findByEmail(user.email)
        if(userExist){
            return next(new ErrorHandler(400, 'user already exist'))
        }
        const otp = await otpGenerate.createOtp()
        await otpRepository.createOtp(user.email, otp)
        await sentEmail.sentEmailVerification(user.name,user.email,otp)
        const hashPasswords = await hashPassword.createHash(user.password as string)
        user.password=hashPasswords
        const token = await jwt.create_verification_jwt({name: user.name, email: user.email, password: user.password})
        return token
    } catch (error) {
        catchError(error, next)
    }
}