export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    isOperational: boolean;

    constructor(message: string, statusCode = 500) {
        super(message);

        this.statusCode = statusCode;
        this.success = false;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}