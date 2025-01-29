import { Request, Response, NextFunction } from "express";
import { isAuthenticate } from "./auth";

export const isUser = (req:Request,res:Response,next:NextFunction)=>{
    try {
       return isAuthenticate(req,res,next)

        // const role = req.headers['x-user-role'] as string;
        // console.log('role of req',role)
        // if(role=='user'){
        //     console.log('ready for user')
        //     next()
        // }else{
        //     console.log('no role error')
        //     res.json({message:'inValid Access !!! Login again',succuss:false}).status(401)
        // }
    } catch (error) {
        throw error
    }
}
export const isAdmin = (req:Request,res:Response,next:NextFunction):void | Promise<void>=>{
    try {
        isAuthenticate(req,res,next)
        // const role = req.headers['x-user-role'] as string;
        // console.log('role of req',role);
        // if(role=='admin'){
        //     console.log('ready for admin')
        //     next()
        // }else{
        //     console.log("no role err")
        //     res.json({message:'inValid Access admin !!! Login again',succuss:false}).status(401)
        // }
    } catch (error) {
        throw error
    }
}