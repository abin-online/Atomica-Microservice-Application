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
        console.log('Comming here req.headers auth ',authHeader,refreshToken);
        if(!accessToken &&!refreshToken){
            console.log('logging out')
            return res.status(401).json({message:'ACCESS FORBIDDEN',success:false});

        }
        console.log('all right')

        try {
            console.log(accessToken , '_______all right', process.env.JWT_ACCESS_KEY )
            
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
                console.log("errrrrrrrrr", error)
                const decodedRefreshToken = jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY as Secret) as CustomJwtPayload;
               
                if(!decodedRefreshToken){
                    console.log('Logging Out');
                    return res.status(401).json({message:'ACCESS FORBIDDEN',succuss:false})
                }
                const newAccessToken = jwt.sign({userId:decodedRefreshToken.userId},process.env.JWT_ACCESS_KEY as Secret,{expiresIn:'15m'})
                console.log("decodedRefreshToken-------------<-=[||||=<>0|+>~ " , decodedRefreshToken)
                res.setHeader('Authorization',`Bearer ${newAccessToken}`);
                req.user = {userId:decodedRefreshToken.id,role};

                next()
                
            } catch (error) {
                return res.status(401).json({message:'ACCESS FORBIDDEN',succus:false})
            }
            
        }
    } catch (error) {
        console.log('error')
        catchError(error,next)
    }
}