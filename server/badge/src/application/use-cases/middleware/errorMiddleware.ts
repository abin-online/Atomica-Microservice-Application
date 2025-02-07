import { Req, Res, Next } from "../../../interface/serverTypes/serverTypes";
import ErrorHandler from "./errorHandler";

export const errorMiddleware = (err: any, req: Req, res: Res, next: Next): void => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'server error'

    if (err.name === 'CastError') {
        const message = `Resource not found, invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(400, message);
    }
    if (err.message === 'jsonWebTokenError') { 
        const message = 'JSON Web Token is invalid, try again';
        err = new ErrorHandler(400, message);
    }
    if (err.message === 'TokenExpiredError') {
        const message = 'JSON Web Token has expired';
        err = new ErrorHandler(400, message);
    }

    res.status(err.statusCode).json({
        status: err.statusCode,
        success: false,
        message: err.message
    });
}