const app = require("./app");
const dotenv = require("dotenv")
const connectDatabase = require("./config/db")
const  cloudinary = require("cloudinary")
const cors = require("cors");

// expection hanlding 
process.on("uncaughtException" , (err) => {
    console.log(`Error : ${err.message}`);
    console.log("shutting down the server due to unhandled expection");

  
       process.exit(1);
   

})
app.use(cors({
  origin: [
    "http://localhost:3000",       // local dev
    "https://sjfurnitures.store"   // your frontend domain
  ],
  credentials: true
}));

//config
 
dotenv.config({path:"backend/config/.env"});
 //db connection

 connectDatabase(); 
 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
 })
   
const server= app.listen(process.env.PORT,()=>(
    console.log(`server is working on port http://localhost:${process.env.PORT}`)
)); 
 
//unhandled promise rejection



process.on("unhandledRejection" , (err) => {
     console.log(`Error : ${err.message}`);
     console.log("shutting down the server due to unhandled promise rejectiom");

     server.close(() => {
        process.exit(1);
     });

})

