import { Req, Res, Next } from "../framework/types/serverTypes";
import { Iuser_use_case } from "../usecases/interface/usecase/user_use_case";
import { access_token_options, refresh_token_options } from "../framework/api/middleware/token";

export class UserController {
    private user_use_case: Iuser_use_case
    constructor(user_use_case: Iuser_use_case) {
        this.user_use_case = user_use_case
    }
    async signup(req: Req, res: Res, next: Next) {
        try {
            const {name, email, password} = req.body;
            const token = await this.user_use_case.user_signup({name, email, password}, next)
            if(token) {
                res.cookie('verification_token', 'token', {
                    httpOnly: true,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 300 * 60 * 1000)
                })
                res.status(200).json({
                    success: true,
                    message: 'verification otp has been send to this email',
                    verify_token: token
                })
            }
        } catch (error : any) {
            return error
        }
    }

    
}



// console.log(` █████╗  ████████╗  ██████╗  ███╗   ███╗ ██╗  ██████╗  █████╗ `)
// console.log(`██╔══██╗ ╚══██╔══╝ ██╔═══██╗ ████╗ ████║ ██║ ██╔════╝ ██╔══██╗`)
// console.log(`███████║    ██║    ██║   ██║ ██╔████╔██║ ██║ ██║      ███████║`)
// console.log(`██╔══██║    ██║    ██║   ██║ ██║╚██╔╝██║ ██║ ██║      ██╔══██║`)
// console.log(`██║  ██║    ██║    ╚██████╔╝ ██║ ╚═╝ ██║ ██║ ╚██████╗ ██║  ██║`)
// console.log(`╚═╝  ╚═╝    ╚═╝     ╚═════╝  ╚═╝     ╚═╝ ╚═╝  ╚═════╝ ╚═╝  ╚═╝`)


