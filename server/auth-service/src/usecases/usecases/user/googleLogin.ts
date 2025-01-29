import { Next } from "../../../framework/types/serverTypes";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { IhashPassword } from "../../interface/service/hashPassword";
import { IJwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";

export const googleLogin = async (userRepository:IuserRepository,hashPassword:IhashPassword,jwt:IJwt,name:string,email:string,password:string,next:Next):Promise <object|void>=>{
    try {
        const user = await userRepository.findByEmail(email);
        if (!user){
            const user= await userRepository.createUser({name,email,password})
            console.log(user,'google login user ',user.is_blocked)
            if(user.is_blocked) return next(new ErrorHandler(400,'admin blocked the user'))
            const token:any = await jwt.create_access_and_refresh_token(user.email as string)
                token.role='user'
                console.log(token,"the token is checking in user use case index in")
            return {user,token}
        }
        if(user.is_blocked) return next(new ErrorHandler(400,'admin blocked the user'))
        const token:any =await jwt.create_access_and_refresh_token(user.email as string)
    console.log(token,"the google token place")
    token.role='user'
        return {user,token}
    } catch (error) {
        
    }
}