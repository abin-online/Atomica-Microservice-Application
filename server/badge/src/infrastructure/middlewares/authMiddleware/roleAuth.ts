import { Request, Response, NextFunction } from "express";
import { isAuthenticate } from "./auth";

export const isUser = (req:Request,res:Response,next:NextFunction) :void | Promise<void>=>{
    try {
        
    isAuthenticate(req,res,next)

    } catch (error) {
        throw error
    }
}
export const isAdmin = (req:Request,res:Response,next:NextFunction):void | Promise<void>=>{
    try {
        isAuthenticate(req,res,next)

    } catch (error) {
        throw error
    }
}