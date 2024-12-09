import { Iuser } from "../../entities/user";
import { IJwt, Itoken } from "../../usecases/interface/service/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
require('dotenv').config()

export class JWTtoken implements IJwt {
    JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || ""
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || ""
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || ""

    async create_verification_jwt(payload: Iuser): Promise<string> {
        const verifyToken = await jwt.sign(payload, this.JWT_VERIFICATION_KEY, {
            expiresIn: '1h',
        })
        console.log("in side the servie", verifyToken)
        return verifyToken
    }

    async create_access_and_refresh_token(id: string): Promise<object> {
        const payload = { id }
        const accessToken = await jwt.sign(payload, this.JWT_ACCESS_KEY, {
            expiresIn: '5h'
        })

        const refreshToken = await jwt.sign(payload, this.JWT_REFRESH_KEY, {
            expiresIn: '3d',
        })

        return { accessToken, refreshToken, role: "" }
    }

    async verify_jwt(token: string): Promise<object> {
        try {
            const data = await (jwt.verify(token, this.JWT_VERIFICATION_KEY)) as Iuser
            return data
        } catch (error) {
            throw error
        }
    }

    async forget_password_token(user_id: string, email: string): Promise<string> {
        const token = await jwt.sign({ user_id, email }, this.JWT_VERIFICATION_KEY, {
            expiresIn: '10m'
        })
        return token
    }
}