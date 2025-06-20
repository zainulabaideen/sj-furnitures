const ErrorHandler = require("../utils/errorhandling");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError( async(req,res,next)=> {
    const { token }   = req.cookies;
     if(!token){
        return next(new ErrorHandler("Please login to access this resource" , 401));
     }
     const decodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user = await User.findById(decodedData.id);

  next();  
}); 

// exports.authorizeRoles = (...roles) => {
//    return (req,res,next) => {
//       if(!roles.includes(req.user.role)){
//         return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to axcess this resource` , 403))

//       }  

//       next();
//    }; 
// };

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)
      );
    }

    next();
  };
};
