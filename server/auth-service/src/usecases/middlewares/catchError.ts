import { Next } from "../../framework/types/serverTypes";
import {ErrorHandler} from './errorHandler'
export const catchError = (error:unknown,next:Next)=>{
    console.log('catch error')
    let message:string
     if(error instanceof Error){
        message = error.message
     }else if(error && typeof error =='object' && 'message' in error){
        message = String(error.message)
     }else if(typeof error ==='string'){
        message = error
     }else{
        message = 'unknown error'
     }
     return next(new ErrorHandler(500,message))
}