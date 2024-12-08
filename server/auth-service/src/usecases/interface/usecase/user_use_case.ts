import { Next } from '../../../framework/types/serverTypes';
import { Iuser } from '../../../entities/user';
import { Itoken } from '../service/jwt';
export interface Iuser_use_case{
    userSignup(user: Iuser, next: Next): Promise <string | void>
    create_user(email: string, otp: string, next: Next): Promise <Iuser | void>
    login(email: string, password: string, next: Next): Promise <{user: Iuser, token: Itoken} | void>
}
