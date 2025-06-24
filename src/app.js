
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const http = require("http");
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
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter);
 app.use("/",userRouter);
 app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server)


connectDB().then(()=>{
    console.log("database connected");
    server.listen(process.env.PORT|| 3000,'0.0.0.0',()=>{
    console.log("server run horaha hai😎")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
