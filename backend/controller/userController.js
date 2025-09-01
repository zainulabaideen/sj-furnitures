const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const { trusted } = require("mongoose");
const cloudinary = require("cloudinary")


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
  try {
    const { name, email, password, phone, address } = req.body;

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

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      avatar: avatarData,
      otp,
      otpExpire: Date.now() + 1 * 60 * 1000, // ⏱️ valid for 1 minute
    });

    // ✅ Branded Email Message
    const message = `
Dear ${name},

Welcome to **SJ-Furnitures**! 🪑✨  

Thank you for registering with us. To complete your signup, please verify your email address using the OTP below:

👉 **${otp}**

⚠️ Note: This OTP will expire in **1 minute** for your security.  

If you didn’t request this, kindly ignore this email.  

Best regards,  
The **SJ-Furnitures** Team 🛋️
`;

    await sendEmail({
      email: user.email,
      subject: "SJ-Furnitures - Verify Your Email",
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please verify the OTP sent to your email.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



exports.verifyOtp = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    // ✅ Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpire = undefined;
    user.isVerified = true;   // 🔹 Mark user as verified
    await user.save();

    // ✅ Send token so user gets logged in
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



exports.resendOtp = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 1 * 60 * 1000; // 1 minute
    await user.save();

    const message = `
Hello again 👋,  

Here’s your new OTP for **SJ-Furnitures**:  

👉 **${otp}**

⚠️ This code will expire in **1 minute**.  

If you didn’t request this OTP, please ignore this email.  

Warm regards,  
The **SJ-Furnitures** Team 🪑
`;

    await sendEmail({
      email: user.email,
      subject: "SJ-Furnitures - Resend OTP",
      message,
    });

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
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
  sendToken(user, 200, res);

});

//logout  user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: " loggedout successfully"
  })
})


//forward password

// exports.forwardPassword = catchAsyncErrors(async(req,res,next) => {
//   const user = await User.findOne({email:req.body.email});
//   if(!user){
//     return next(new ErrorHandler("User not found" , 404))
//   }

//   // get resetpassowr dtoken

//   const resetToken =user.getResetPasswordToken();

//   await user.save({validateBeforeSave: false});


//   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`

//   const message = `your password reset token is :- \n\n ${resetPasswordUrl} \N\N IF YOU HAVE NOT THIS REQUESTED EMAIL THEN PLEAS IGNORE IT `;

//   try {
//       await sendEmail({
//          email: user.email,
//          subject: 'Ecoerce password recovery',
//          message,
//       })
//       res.status(200).json({
//         success: true,
//         message:`Email sent to ${user.email} successfully`
//       })

//   } catch (error) {
//      user.resetPasswordToken = undefined;
//      user.resetPasswordExpire = undefined;
//   await user.save({validateBeforeSave: false});

//   return next(new ErrorHandler(error.message,500))


//   }
// })
exports.forwardPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 1. Generate reset token
  const resetToken = user.getResetPasswordToken();

  // DEBUG LOGGING: See what is being sent/stored
  console.log("Raw reset token:", resetToken); // This is the one sent via email
  console.log("Hashed token saved in DB:", user.resetPasswordToken);

  // 2. Save hashed token + expiry
  await user.save({ validateBeforeSave: false });

  // 3. Create reset URL
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  // 4. Message
  const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you did not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Reset email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email sending failed: " + error.message, 500));
  }
});


//reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  //create tokrn hash
  const resetPasswordToken = crypto.
    createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },

  })

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 401))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));

  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);

})

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  })

})

// update password user
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password is incorrect", 400))
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("password doesnot match", 400))

  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
})

//update user profile
// exports.updateProfile = catchAsyncErrors(async(req,res,next) => {

//    const newUserData={
//     name:req.body.name,
//     email:req.body.email,
//    }


//    const user = await User.findByIdAndUpdate(req.user.id,newUserData , {
//     new: true,
//     runValidators:true,
//     useFindAndModify : false ,
//    });





//   sendToken(200).json({
//     success:true,

//   })

// })

// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };


//   if(req.body.avatar !== ""){
//      const user = await user.findById(req.user.id);
//      const imageId = user.avatar.public_ID;

//      await cloudinary.v2.uploader.destroy(imageId);

//       const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });
//  newUserData.avatar = {
//   public_ID: myCloud.public_ID,
//   url: myCloud.secure_url,
//  }

//   }

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   sendToken(user, 200, res).json({
//     success:true,

//  }) 
// });

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // If a new avatar is uploaded
  if (req.files && req.files.avatar) {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_ID;

    await cloudinary.v2.uploader.destroy(imageId);

    const file = req.files.avatar;

    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_ID: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});




//get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: trusted,
    users
  })

})

//get single users details admin
exports.getSingleUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    user,
  })

})

//update user role

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });





  sendToken(200).json({
    success: true,

  })

})

//delete user

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {




  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`user does not exitswith id : ${req.params.id}`))
  }


  await user.deleteOne();
  sendToken(200).json({
    success: true,
    message: "user deleted successfully"

  })

})







