
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/Profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter);
 











connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
