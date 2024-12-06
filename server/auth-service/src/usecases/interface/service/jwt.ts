import { Iuser } from "../../../entities/user"
import { Req } from "../../../framework/types/serverTypes"
import Jwt from "jsonwebtoken"

export interface Itoken {
    access_token: string,
    refresh_token: string,
    role: string
}

export interface IJwt {
    create_verification_jwt(payload: Iuser): Promise<string>;
    create_access_and_refresh_token(id: string): Promise<object>;
    verify_jwt(token: string): Promise<object>;
    forget_password_token(user_id: string, email: string): Promise<string>;
}