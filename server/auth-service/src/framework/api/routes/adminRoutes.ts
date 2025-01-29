import { Next, Req, Res, Route } from "../../types/serverTypes";
import { isAdmin } from "../middleware/roleAuth";
import { adminController } from "./injections/injections";

export function AdminRoute(router : Route) {
    router.get('/get-users' , isAdmin,  async(req: Req, res: Res, next: Next)=> {
        //console.log('hiii')
        adminController.getUserData(req, res, next)
    })

    router.put('/block-user' , isAdmin, async(req: Req, res: Res, next)=> {
        adminController.blockUser(req, res, next)
    })

    router.post('/adminLogin' , async(req: Req, res: Res, next)=> {
        console.log('admIN loGIN')
        adminController.adminLogin(req, res, next)
    })
    router.post('/adminLogout' , async(req: Req, res: Res, next) => {
        adminController.logout(req, res, next)
    })
}