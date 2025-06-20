const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  




authRouter.post("/signup", async(req, res)=>{
    try{ validateSignupData(req)
 

    const {firstName, lastName, emailId, password} = req.body

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash)

       const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
       });

    const savedUser = await user.save();
     const token = await savedUser.getJwt();
         res.cookie("token",token,{
            expires: new Date(Date.now() + 8 + 3600000)
         });
    res.json({message:"user aagye oyeee", data: savedUser});}
    catch(err){
        res.status(400).send("Error: " + err.message)
        // console.log(err)
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

            res.send(user);
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