import { Next, Req, Res, Route } from "../../types/serverTypes";
import { Iuser } from "../../../entities/user";
export function user_route(router:  Route) {
    router.post('/register', async(req: Req, res: Res, next: Next)=> {
        
    })
}