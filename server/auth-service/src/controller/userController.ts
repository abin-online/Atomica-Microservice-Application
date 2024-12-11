import { Req, Res, Next } from "../framework/types/serverTypes";
import { Iuser_use_case } from "../usecases/interface/usecase/user_use_case";
import { access_token_options, refresh_token_options } from "../framework/api/middleware/token";
import ErrorHandler from "../usecases/middlewares/errorHandler";

export class UserController {
    private userUserCase: Iuser_use_case
    constructor(userUserCase: Iuser_use_case) {
        this.userUserCase = userUserCase
    }
    async signup(req: Req, res: Res, next: Next) {
        try {
            console.log('Haii', req.body)
            const { name, email, password } = req.body;
            const token = await this.userUserCase.userSignup({ name, email, password }, next)
            console.log('token kidachaach => ' , token)
            if (token) {
                res.cookie('verification_token', 'token', {
                    httpOnly: true,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 300 * 60 * 1000)
                })
                res.status(200).json({
                    success: true,
                    message: 'verification otp has been send to this email',
                    verifyToken: token
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    async create_user(req: Req, res: Res, next: Next) {
        try {
            console.log(req.headers)
            const token = req.headers['x-verify-token']
            console.log('created user ===> ', token)
            if (typeof token != 'string') {
                throw new ErrorHandler(400, 'Invalid token')
            }
            const user = await this.userUserCase.create_user(token as string, req.body.otp, next)
            if (user) {
                res.clearCookie('verification_token').send(user)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
}



// console.log(` █████╗  ████████╗  ██████╗  ███╗   ███╗ ██╗  ██████╗  █████╗ `)
// console.log(`██╔══██╗ ╚══██╔══╝ ██╔═══██╗ ████╗ ████║ ██║ ██╔════╝ ██╔══██╗`)
// console.log(`███████║    ██║    ██║   ██║ ██╔████╔██║ ██║ ██║      ███████║`)
// console.log(`██╔══██║    ██║    ██║   ██║ ██║╚██╔╝██║ ██║ ██║      ██╔══██║`)
// console.log(`██║  ██║    ██║    ╚██████╔╝ ██║ ╚═╝ ██║ ██║ ╚██████╗ ██║  ██║`)
// console.log(`╚═╝  ╚═╝    ╚═╝     ╚═════╝  ╚═╝     ╚═╝ ╚═╝  ╚═════╝ ╚═╝  ╚═╝`)


