import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverTypes";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IJwt } from "../../interface/service/jwt";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const createUser = async (token: string, otp: string, otpRepository: IotpRepository, userRepository: IuserRepository, hashPassword: IhashPassword, jwt: IJwt, next: Next): Promise<Iuser | void> => {
    try {
        const decode = await jwt.verify_jwt(token) as Iuser
        if (!decode) {
            return next(new ErrorHandler(400, 'token has expired, register again'))
        }

        const result = await otpRepository.findOtp(decode.email)
        if (!result) {
            return next(new ErrorHandler(400, 'otp expired'))
        }

        if(result.otp !== otp.replace(/,/g,'')){
            return next(new ErrorHandler(400, 'invalid otp'))
        }

        const newUser = await userRepository.createUser(decode)
        return newUser
    } catch (error) {

    }
}