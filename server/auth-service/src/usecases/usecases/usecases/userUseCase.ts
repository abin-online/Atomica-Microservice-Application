import { Req, Res, Next } from "../../../framework/types/serverTypes";
import { Iuser_use_case } from "../../interface/usecase/user_use_case";
import { Iuser } from "../../../entities/user";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IJwt } from "../../interface/service/jwt";
import { catchError } from "../../middlewares/catchError";
import { userSignup, createUser, login } from "../user/index";

export class UserUseCase implements Iuser_use_case {
    constructor(
        private userRepository: IuserRepository,
        private jwt: IJwt,
        private otpGenerate: IotpGenerate,
        private otpRepository: IotpRepository,
        private sentEmail: IsentEmail,
        private hashPassword: IhashPassword,
    ) { }

    async userSignup(user: Iuser, next: Next): Promise<string | void> {
        try {
            console.log('coming in userSignup in userUseCase')
            let toke = await userSignup(
                this.jwt,
                this.otpRepository,
                this.userRepository,
                this.otpGenerate,
                this.hashPassword,
                user,
                this.sentEmail,
                next
            )
            console.log('the toke', toke)
            return toke
        } catch (error) {
            console.log("error userSignup in userUsecase")
            catchError(error, next)

        }
    }

    async create_user(token: string, otp: string, next: Next): Promise<Iuser | void> {
        try {
            const user = await createUser(
                token,
                otp,
                this.otpRepository,
                this.userRepository,
                this.hashPassword,
                this.jwt,
                next)
            console.log("in the usecase", user)
            return user
        } catch (error) {
            catchError(error, next)
        }
    }

    async login(email: string, password: string, next: Next): Promise<any | void> {
        try {
            return await login(this.userRepository, this.jwt, this.hashPassword, email, password, next)
        } catch (error) {
            catchError(error, next)
        }
    }
}