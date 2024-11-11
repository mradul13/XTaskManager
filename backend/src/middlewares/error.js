const config = require('../config/config');

/**
 * Error handling midddleware.
 *
 * @param {Error} err - The error object that was thrown (either a custom `ApiError` or a default `Error`).
 * @param {Object} req - The Express request object. Not directly used but part of the signature.
 * @param {Object} res - The Express response object. Used to send the error response.
 * @param {Function} next - The next middleware function in the stack. Not used here but part of the signature.
 * 
 * @returns {void} Sends an error response to the client, which includes:
 * - `code`: HTTP status code of the error.
 * - `message`: The error message.
 * - `stack` (only in development): The stack trace of the error.
**/
const errorHandler = (err, req, res, next)=>{
    let {statusCode, message} = err;
    res.locals.errorMessage = message;

    const response = {
        code : statusCode,
        message: message,
        ...(config.env==="development" && {stack: err.stack})
    }

    if(config.env=="development"){
        console.error(err)
    }

    res.status(statusCode).send(response);
}

module.exports = {errorHandler}