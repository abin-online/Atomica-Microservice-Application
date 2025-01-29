import { JwtPayload, Secret } from "jsonwebtoken";
import { Req, Res, Next } from "../types/serverTypes";
import jwt from 'jsonwebtoken'
// import { catchError } from "../../../usecases/middlewares/catchError";
require('dotenv').config();
interface CustomRequest extends Req{
    user?:{userId:string,role:string};
}

interface CustomJwtPayload extends JwtPayload{
    userId:string;
}

export const isAuthenticate = async (req:CustomRequest,res:Res,next:Next)=>{
    try {
        const authHeader = req.headers['authorization'];
        const refreshToken = req.headers['x-refresh-token'] as string;
        const role = req.headers['x-user-role'] as string;
        console.log('auth',authHeader)
        console.log('Ref',refreshToken)
        console.log('rol',role)
        if(!authHeader||!refreshToken||!role){
            return res.status(401).json({message:'ACCESS FORBIDDEN',success:false});
        }
        const accessToken = authHeader.split(' ')[1];
        console.log('Comming here req.headers auth ',authHeader,refreshToken);
        if(!accessToken &&!refreshToken){
            return res.status(401).json({message:'ACCESS FORBIDDEN',success:false});

        }
        try {
            const decoded = jwt.verify(accessToken,process.env.JWT_ACCESS_KEY as Secret) as CustomJwtPayload;
            if(decoded){
                req.user={userId:decoded.userId,role};
                next()
            }else{
                return res.status(401).json({message:'ACCESS FORBIDDEN',succuss:false})
            }
        } catch (error) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY as Secret) as CustomJwtPayload;
               
                if(!decodedRefreshToken){
                    return res.status(401).json({message:'ACCESS FORBIDDEN',succuss:false})
                }
                const newAccessToken = jwt.sign({userId:decodedRefreshToken.userId},process.env.JWT_ACCESS_KEY as Secret,{expiresIn:'15m'})
                res.setHeader('Authorization',`Bearer ${newAccessToken}`);
                req.user = {userId:decodedRefreshToken.userId,role};
                next()
                
            } catch (error) {
                return res.status(401).json({message:'ACCESS FORBIDDEN',succus:false})
            }
            
        }
    } catch (error) {
        console.log('error')
        // catchError(error,next)
    }
}