
/**
 * ApiError Class represents a API Error that corresponds to error codes in http
 * @class ApiError
 * @extends Error
**/
class ApiError extends Error{
    /**
     * @param {String} message - Message to console in case of error
     * @param {import("http-status").HttpStatus} statusCode - Http status code for error
     * @param {boolean} [isOperational=true] - Represents type of Error
     * @param {string} [stack=""] - Represents error stack
    **/
    constructor(statusCode, message, isOperational=true, stack=""){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if(stack){
            this.stack = stack;
        }
        else{
            this.stack = Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = ApiError;