const express = require("express");

const profileRouter = express.Router();
const {UserAuth} = require("../middlewares/auth");
const {validateProfileData} = require("../utils/validation")


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
})

module.exports = profileRouter;