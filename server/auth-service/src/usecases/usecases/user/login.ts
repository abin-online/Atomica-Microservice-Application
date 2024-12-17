import { Next } from "../../../framework/types/serverTypes";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IJwt } from "../../interface/service/jwt";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";


export const login = async (userRepository: IuserRepository, jwt: IJwt, hashPassword: IhashPassword, email: string, password: string, next: Next): Promise<object | void> => {
    try {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            return next(new ErrorHandler(400, 'invalid email id'))
        }
        if (user.is_blocked == true) {
            console.log('user is blocked')
            return next(new ErrorHandler(400, 'access denied'))
        }
        const comparePassword = await hashPassword.compareHashPassword(password, user.password)

        if (!comparePassword) {
            return next(new ErrorHandler(400, 'incorrect password'))
        }
        const token: any = await jwt.create_access_and_refresh_token(user._id as string)
        token.role = 'user'
        return {
            user, 
            token
        }
    } catch (error) {
        throw error
    }
}