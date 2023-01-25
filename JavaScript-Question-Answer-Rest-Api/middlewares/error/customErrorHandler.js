const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {

    let customError = err;
    //console.log(customError.name);


    

    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax...", 400)
    }

    if (err.name === "ValidationError") {
        customError = new CustomError(err.message, 400)
    }
    if (err.code===11000) {
        //Duplicate Key
        customError = new CustomError("Duplicate Key Found: Check your Email(input)...",400)
    }
    if (err.name ==="CastError") {
        customError = new CustomError("Please provide a valid id",404)
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    });
};

module.exports = customErrorHandler;