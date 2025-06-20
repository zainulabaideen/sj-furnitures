const ErrorHandler = require("../utils/errorhandling");

module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        message = `Resource not found. Invalid: ${err.path}`;
        statusCode = 400;
    } 

    //mongoose duplicate key error 

    if(err.code === 11000){
        const message = `duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message , 400);
    }

        if (err.name === "jsonwebtokenerror") {
        message = `Json web token is invalid, try again `;
        statusCode = 400;
    } 

           if (err.name === "tokenexpireerror") {
        message = `Json web token is expire ,try again `;
        statusCode = 400;
    } 

    res.status(statusCode).json({
        success: false,
        message,
    });
};
