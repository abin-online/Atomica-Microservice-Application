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
            console.log('token go => ' , token)

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

    async login(req: Req, res: Res, next: Next) {
        try {
            console.log(req.body, 'user login')
            const user = await this.userUserCase.login(req.body.email, req.body.password, next)
            //console.log(user, 'user in controller')

            if (user) {
                //console.log(user.token, 'user token')
                //console.log(access_token_options, 'the access token option')
                res.cookie('accesToken', {accessToken:user.token.access_token, accessTokenOptions:access_token_options}, {
                    httpOnly: true,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 300 * 60 * 1000)
                })
                res.json(user)

            }
        } catch (error: any) {
            console.log('comming in login err')
        }
    }

    // async resendOTP(req: Req, res:Res, next: Next) {
    //     try {
    //         const newOtp = this.userUserCase.resendOtp(req.body.email, next)

    //     } catch (error: any) {
            
    //     }
    // }

    async forgotPassword(req: Req, res: Res, next: Next) {
        try {
            const result = await this.userUserCase.forgotPasswordRemainder(req.body.email, next)
            if (result) {
                console.log(result)
                res.send(result).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    async createNewPassword(req: Req, res: Res, next: Next) {
        try {

            const result = await this.userUserCase.emailVerify(req.body.email, req.body.otp, next)
            if (result) {
                console.log(result)
                res.send(result).status(201)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }

    }

    async googleLogin(req: Req, res: Res, next: Next) {
        try {
            console.log('google login in controller', req.body)
            const user: any = await this.userUserCase.googleLogin(req.body.name, req.body.email, req.body.password, next)
            console.log(user, 'the user afther creation in controller google')
            if (user) {
                console.log(user.token, 'user token')

                res.cookie('accesToken', user.token.accessToken, access_token_options)
                res.send(user)
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }


    async logout(req: Req, res: Res, next: Next) {
        try {
            console.log('user logged out')
            console.log(access_token_options , refresh_token_options)
            res.clearCookie('accessToken', access_token_options)
            res.clearCookie('refreshToken', refresh_token_options)
            res.status(200).json({ success: true, message: 'logout success' })
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


