
/**
 * Return a function that catches and forwards error to next middleware.
 * 
 * @param {Function} fn - async input function that catchAsync wraps around.
 * 
 * @returns {Function} A function that handles error for input function.
 *
 **/
function catchAsync(fn){
    return function(req, res, next){
        Promise.resolve(fn(req, res, next)).catch((err)=>next(err));
    }
}

module.exports = catchAsync;