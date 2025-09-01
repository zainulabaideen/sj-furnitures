const express = require('express');
const cookieParese = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParese());

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
  useTempFiles: true,  
  tempFileDir: "/tmp/"
}));
  


const errorMiddleware = require("./middleware/error")
//route imports
 
const product = require("./routes/productRoutes");
const { applyTimestamps } = require('./models/userModel');
const user = require("./routes/userRoute");
const order = require("./routes/orderroute");
app.use("/api", product)
app.use("/api",user) 
app.use("/api", order)
app.use(errorMiddleware);

module.exports = app;