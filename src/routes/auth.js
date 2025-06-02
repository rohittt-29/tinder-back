const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  


authRouter.post("/signup", async(req, res)=>{
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

authRouter.post("/login", async(req,res)=>{
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
});

authRouter.post("/logout", async(req, res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull")
})

module.exports = authRouter;