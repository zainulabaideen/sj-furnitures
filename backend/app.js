const express = require('express');
const cookieParese = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cookieParese());

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