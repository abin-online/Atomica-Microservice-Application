import { Next } from "../../../interface/framework/serverTypes";
import ErrorHandler from "./errorHandler";

export const catchError = (error: unknown, next: Next): void => {
    console.log('catch error');
    let message: string;
    
    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as { message: string }).message);
    } else if (typeof error === 'string') {
        message = error;
    } else {
        message = 'Unknown error';
    }
    
    return next(new ErrorHandler(500, message));
};