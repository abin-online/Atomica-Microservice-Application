import { Req, Res, Next } from "../../../framework/types/serverTypes";
import { Iuser_use_case } from "../../interface/usecase/user_use_case";
import { Iuser } from "../../../entities/user";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IJwt } from "../../interface/service/jwt";

export class UserUseCase implements Iuser_use_case {
    constructor(
        private userRepository: IuserRepository,
        private jwt: IJwt,
    ) { }

    async userSignup(user: Iuser, next: Next) : Promise<string | void > {
        try {
            let toke = await userSignup(
                user,
                next
            )
        } catch (error) {
            
        }
    }
}