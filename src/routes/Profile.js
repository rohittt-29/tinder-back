const express = require("express");

const profileRouter = express.Router();
const {UserAuth} = require("../middlewares/auth");
const {validateProfileData} = require("../utils/validation");
const { findOne } = require("../models/user");
const bcrypt = require("bcrypt");
const User = require("../models/user");


profileRouter.get("/profile/view", UserAuth,async(req,res)=>{
    try{

    const user = req.user;
    res.send(user)
}
      catch(err){
        res.status(400).send("Error: " + err.message)
    }
});

profileRouter.patch("/profile/edit",UserAuth, async(req,res)=>{
    try{
  if(!validateProfileData(req)){
    throw new Error("Invalid edit request");
  }
  const loggedinUser = req.user;
  // console.log(loggedinUser)


  Object.keys(req.body).forEach((key)=> (loggedinUser[key]= req.body[key]));
  await loggedinUser.save();
    // console.log(loggedinUser);
    res.json({message:loggedinUser.firstName + " teri profile update hoagyi bhidu",
      data: loggedinUser,
    })
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch("/profile/forgetPassword", async(req, res)=>{
  try{
  const {emailId, newPassword} = req.body;

  if(!emailId || !newPassword){
    throw new Error("email and password necessary hai bro")
  }
  const user = await User.findOne({emailId: emailId});
  if(!user){
    throw new Error("yeh email exist nhi karta 😡")
  }
   if(!newPassword || newPassword.lenght <6){
    throw new Error("strong password dalne ka paisa lagta hai kya..?")

  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.password = passwordHash;

  await user.save();

  console.log(passwordHash)

  res.send("password update hogaya , chal abh party de!")
}
   catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = profileRouter;