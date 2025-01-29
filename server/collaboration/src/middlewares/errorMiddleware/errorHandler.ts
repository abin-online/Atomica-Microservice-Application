export class ErrorHandler extends Error {
    statusCode: number;
    constructor(statusCode: number, message: any) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: this.statusCode,
            message: this.message,
            stack: this.stack,
        };
    }
}
export default ErrorHandler;
