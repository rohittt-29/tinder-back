
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");  
const {UserAuth} = require("./middlewares/auth")


app.use(express.json());
app.use(cookieParser())
app.post("/signup", async(req, res)=>{
    try{ validateSignupData(req)
 

    const {firstName, LastName, emailId, password} = req.body

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash)

       const user = new User({
        firstName,
        LastName,
        emailId,
        password: passwordHash,
       });

    await user.save();
    res.send("user aagye oyeee");}
    catch(err){
        res.status(400).send("Error: " + err.message)
    }
   
});

app.post("/login", async(req,res)=>{
    try{
        const {emailId, password}= req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("InValid Credentials");
        }
        const isPasswordValid = await user.validatepassword(password)

        if(isPasswordValid){
       const token = await user.getJwt();




        res.cookie("token",token)

            res.send("Login hogaya");
        }else{
            throw new Error("InValid Credentials")
        }
    }
      catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

app.get("/profile", UserAuth,async(req,res)=>{
    try{

    const user = req.user;
    res.send(user)
}
      catch(err){
        res.status(400).send("Error: " + err.message)
    }
});

app.post("/sendRequest",UserAuth, async(req, res)=>{
const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + " sending a connection request")
})







connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
