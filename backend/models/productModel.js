const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name "],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product Description "]
    },
    price: {
        type: Number,
        required: [true, "please enter product Price"],
        maxLength: [8, "price can not exceed 8 characters "]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_ID: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }

    ],
    category: {
        type: String,
        required: [true, "please specify product category"]
    },
    stock: {
        type: Number,
        required: [true, " please enter product stock"],
        maxLength: [4, "stock cannot exceed from 4"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
            name: { type: String, required: true },
            rating: { type: Number, required: true }, // ✅ FIXED
            comment: { type: String, required: true }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now

    },

    shipping: {
        type: Number,
        required: [true, "Please enter shipping cost"],
        default: 0
    },


})

module.exports = mongoose.model("Product", productSchema)