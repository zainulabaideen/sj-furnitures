const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const { trusted } = require("mongoose");
const  cloudinary = require("cloudinary")


//register a user

// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//   // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
//   //   folder : "avatars",
//   //   width: 150 ,
//   //   crop:"scale",
//   // })
//    const file = req.files.avatar;

//   const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",
//   });
//   const { name, email, password } = req.body;

//   const user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_ID: myCloud.public_id,
//       url: myCloud.secure_url
//     }
//   });

//   sendToken( user,201,res);
// });

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  let avatarData = {
    public_ID: null,
    url: null,
  };

  if (req.files && req.files.avatar) {
    const file = req.files.avatar;

    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    avatarData = {
      public_ID: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarData,
  });

  sendToken(user, 201, res);
});




//loginuser

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your Email or Password", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }

  const isPasswordMatched = await user.comparePassword(password);



  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }
  sendToken( user,200,res);

});

//logout  user

exports.logout = catchAsyncErrors(async(req,res,next)=> {
 res.cookie("token" , null, {
  expires:new Date(Date.now()),
  httpOnly: true,
 }); 

  res.status(200).json({
    success : true,
    message: " loggedout successfully"
  })
})


//forward password

exports.forwardPassword = catchAsyncErrors(async(req,res,next) => {
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not found" , 404))
  }

  // get resetpassowr dtoken

  const resetToken =user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});


  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`
  
  const message = `your password reset token is :- \n\n ${resetPasswordUrl} \N\N IF YOU HAVE NOT THIS REQUESTED EMAIL THEN PLEAS IGNORE IT `;

  try {
      await sendEmail({
         email: user.email,
         subject: 'Ecoerce password recovery',
         message,
      })
      res.status(200).json({
        success: true,
        message:`Email sent to ${user.email} successfully`
      })

  } catch (error) {
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
  await user.save({validateBeforeSave: false});

  return next(new ErrorHandler(error.message,500))


  }
})


//reset password

exports.resetPassword = catchAsyncErrors(async (req,res,next) => {

  //create tokrn hash
    const  resetPasswordToken = crypto.
            createHash("sha256")
            .update(req.params.token)
            .digest("hex");

            const user = await User.findOne({
              resetPasswordToken,
              resetPasswordExpire: {$gt : Date.now()},

            })

              if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 401))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password does not password" , 400));

  }

  user.password = req.body.password;

    user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200,res);

})
 
//get user details
exports.getUserDetails = catchAsyncErrors(async(req,res,next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  })

})

// update password user
exports.updatePassword = catchAsyncErrors(async(req,res,next) => {

  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password is incorrect", 400))
  }
 if(req.body.newPassword != req.body.confirmPassword){
    return next(new ErrorHandler("password doesnot match", 400))
      
 } 

 user.password = req.body.newPassword;
 await user.save();
  sendToken(user,200,res);
})

//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) => {

   const newUserData={
    name:req.body.name,
    email:req.body.email,
   }


   const user = await User.findByIdAndUpdate(req.user.id,newUserData , {
    new: true,
    runValidators:true,
    useFindAndModify : false ,
   });


  

 
  sendToken(200).json({
    success:true,

  })
  
})


//get all users
exports.getAllUsers = catchAsyncErrors(async(req,res,next) => {
  const users = await User.find();
  res.status(200).json({
    success: trusted,
    users
  })

})

//get single users details admin
exports.getSingleUsers = catchAsyncErrors(async(req,res,next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    user,
  })

})

//update user role

exports.updateUserRole = catchAsyncErrors(async(req,res,next) => {

   const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
   }


   const user = await User.findByIdAndUpdate(req.user.id,newUserData , {
    new: true,
    runValidators:true,
    useFindAndModify : false ,
   });


  

 
  sendToken(200).json({
    success:true,

  })
  
})

  //delete user

exports.deleteUser = catchAsyncErrors(async(req,res,next) => {

 


const user = await User.findById(req.params.id);
if(!user){
  return next(new ErrorHandler(`user does not exitswith id : ${req.params.id}`))
}


await user.deleteOne();
  sendToken(200).json({
    success:true,
    message: "user deleted successfully"

  })
  
})







