import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./errorHandler";

export const errMiddleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode= err.statusCode ||500;
    err.message = err.message || 'Internal server error'
    console.log('Inside err middleware')
    console.log('What is the err message',err.message)
    if(err.name =='castError'){
        const message = 'Resource not found,invalid:'+err.path;
        err= new ErrorHandler(400,message)
    }
    if(err.name==11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(400,message)
    }
    if(err.message=='jsonWebTokenError'){
        const message = 'json web token is invalid, try again'
        err = new ErrorHandler(400,message);
    }
    if(err.message=='TokenExpiredError'){
        const message = 'json web token has expired'
        err = new ErrorHandler(400,message);
    }
    console.log('err occured',err.statusCode,err.message)
    res.status(err.statusCode).json({
        status:err.statusCode,
        success:false,
        message:err.message
    })
}