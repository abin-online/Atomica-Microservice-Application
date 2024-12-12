import { Next, Req, Res, Route } from "../../types/serverTypes";
import { Iuser } from "../../../entities/user";
import { userController } from "./injections/injections";
import { isUser } from "../middleware/roleAuth";


export function UserRoute(router:  Route) {

    router.post('/register', async(req: Req, res: Res, next: Next)=> {
        userController.signup(req, res, next )
    })

    router.post('/createUser', async(req: Req, res: Res, next: Next)=> {
        userController.create_user(req, res, next)
    })

    router.post('/login' , async(req: Req, res: Res, next: Next) => {
        userController.login(req, res, next)
    })

    router.post('/forgotPassword', async (req: Req, res: Res, next) => {
        console.log('comming in forgot password', req.body)
        userController.forgotPassword(req, res, next)
    })

    // router.post('/resendOtp' , async(req: Req, res: Res, next: Next) => {
    //     userController.resendOTP(req, res, next)
    // })
    
    router.post('/createNewPassword', async (req: Req, res: Res, next: Next) => {
        console.log('comming in createNew password')
        userController.createNewPassword(req, res, next)
    })

    router.post('/googleLogin', async (req: Req, res: Res, next: Next) => {
        console.log('comming in google login')
        userController.googleLogin(req, res, next);
    })

    router.post('/logout', isUser, async (req: Req, res: Res, next: Next) => {
        console.log('comming into logout')
        userController.logout(req, res, next);
    })
}