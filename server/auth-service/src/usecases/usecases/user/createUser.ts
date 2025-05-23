import { Iuser } from "../../../entities/user";
import produce from "../../../framework/api/config/kafka/producer";
import { Next } from "../../../framework/types/serverTypes";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IJwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";

export const createUser = async (token: string, otp: string, otpRepository: IotpRepository, userRepository: IuserRepository, hashPassword: IhashPassword, jwt: IJwt, next: Next): Promise<Iuser | void> => {
    try {
        console.log('create userrrrrrr')
        const decode = await jwt.verify_jwt(token) as Iuser
        console.log('decode', decode)
        if (!decode) {
            return next(new ErrorHandler(400, 'token has expired, register again'))
        }

        const result = await otpRepository.findOtp(decode.email)
        console.log('otp repo     ', result)
        if (!result) {
            return next(new ErrorHandler(400, 'otp expired'))
        }
        console.log(result.otp, "     ", otp)
        if (result.otp !== otp) {
            return next(new ErrorHandler(400, 'invalid otp'))
        }

        const newUser = await userRepository.createUser(decode)
        console.log('decode data for add-user topic _______', decode)
        
        //---------------------------------------------
        await produce('add-user', decode) //kafka produce |
        //---------------------------------------------
        await otpRepository.findAndDeleteUser(decode.email)
        return newUser
    } catch (error) {

    }
}