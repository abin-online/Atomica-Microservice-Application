import { Next, Req, Res, Route } from "../../types/serverTypes";
import { adminController } from "./injections/injections";

export function AdminRoute(router : Route) {
    router.get('/get-users' , async(req: Req, res: Res, next: Next)=> {
        //console.log('hiii')
        adminController.getUserData(req, res, next)
    })

    router.put('/block-user' , async(req: Req, res: Res, next)=> {
        adminController.blockUser(req, res, next)
    })

}