import { Next, Req, Res, Route } from "../../types/serverTypes";
import { Iuser } from "../../../entities/user";
import { userController } from "./injections/injections";

export function UserRoute(router:  Route) {

    router.post('/register', async(req: Req, res: Res, next: Next)=> {
        userController.signup(req, res, next )
    })

    router.post('/createUser', async(req: Req, res: Res, next: Next)=> {
        userController.create_user(req, res, next)
    })
}