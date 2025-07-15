const app = require("./app");
const dotenv = require("dotenv")
const connectDatabase = require("./config/db")

  

// expection hanlding 
process.on("uncaughtException" , (err) => {
    console.log(`Error : ${err.message}`);
    console.log("shutting down the server due to unhandled expection");

  
       process.exit(1);
   

})

//config
 
dotenv.config({path:"backend/config/.env"});
 //db connection

 connectDatabase(); 

   
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

