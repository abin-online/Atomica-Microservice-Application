import { Next, Req, Res } from "../../types/serverTypes";
import { isAuthenticate } from "./auth";

export const isUser = (req: Req, res: Res, next: Next) => {
    try {

        console.log('iuser, authenticated')
        isAuthenticate(req, res, next)
    } catch (error) {
        throw error
    }
}
export const isAdmin = (req: Req, res: Res, next: Next) => {
    try {
        isAuthenticate(req, res, next)

    } catch (error) {
        throw error
    }
}