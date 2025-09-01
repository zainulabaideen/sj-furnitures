const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv")
dotenv.config({path:"backend/config/.env"});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log("Cloudinary Config:", process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ missing");


module.exports = cloudinary;
