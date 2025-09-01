const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "name cannot exceed 30 characters"],
        minLength: [4, "name atleast minimum 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    address: {
        type: String,
        required: [true, "Please enter your address"],
    },
    avatar: {
        public_ID: {
            type: String,
            default: null,
        },
        url: {
            type: String,
            default: null,
        },
    },
    role: {
        type: String,
        default: "user"
    },
    otp: String,
    otpExpire: Date,
    isVerified: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
};

module.exports = mongoose.model("user", userSchema);
