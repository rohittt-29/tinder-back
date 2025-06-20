
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin: ["http://localhost:5173", 
         "https://togetha-web.vercel.app"],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/Profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter);
 app.use("/",userRouter);











connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
