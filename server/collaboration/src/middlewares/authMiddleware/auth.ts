import { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { catchError } from "../errorMiddleware/catchError";
require('dotenv').config();
interface CustomRequest extends Request{
    user?:{userId:string,role:string};
}

interface CustomJwtPayload extends JwtPayload{
    userId:string;
}

export const isAuthenticate = async (req:CustomRequest,res:Response,next:NextFunction)=>{
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
        console.log('Comming here req.headers auth ',authHeader,refreshToken, "accessToken", accessToken);
        if(!accessToken &&!refreshToken){
            console.log('haiii')
            return res.status(401).json({message:'ACCESS FORBIDDEN',success:false});

        }
        try {
            console.log('access key_____', process.env.JWT_ACCESS_KEY)
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as Secret) as CustomJwtPayload;
            console.log("decoded_________" , decoded)
            if(decoded){
                req.user={userId:decoded.id,role};
                console.log("_____#REQDOTUSER_____", req.user)
                next()
            }else{
                return res.status(401).json({message:'ACCESS FORBIDDEN',succuss:false})
            }
        } catch (error) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY as Secret) as CustomJwtPayload;
                console.log(decodedRefreshToken)
                if(!decodedRefreshToken){
                    return res.status(401).json({message:'ACCESS FORBIDDEN',success:false})
                }
                const newAccessToken = jwt.sign({userId:decodedRefreshToken.id},process.env.JWT_ACCESS_KEY as Secret,{expiresIn:'15m'})
                res.setHeader('Authorization',`Bearer ${newAccessToken}`);
                req.user = {userId:decodedRefreshToken.id,role};
                console.log("req.user", req.user)
                next()
                
            } catch (error) {
                return res.status(401).json({message:'ACCESS FORBIDDEN',success:false})
            }
            
        }
    } catch (error) {
        console.log('error')
        catchError(error,next)
    }
}