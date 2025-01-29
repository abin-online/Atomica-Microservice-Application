import { Next, Req, Res } from "../../types/serverTypes";
import { isAdminAuthenticate } from "./adminAuth";
import { isAuthenticate } from "./userAuth";

export const isUser = (req: Req, res: Res, next: Next) => {
    try {

        console.log('iuser, authEntIcatIOn')
        isAuthenticate(req, res, next) //USER AUTHENTICATION
    } catch (error) {
        throw error
    }
}
export const isAdmin = (req: Req, res: Res, next: Next) => {
    try {
        isAdminAuthenticate(req, res, next)
    } catch (error) {
        throw error
    }
}