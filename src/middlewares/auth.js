const jwt = require("jsonwebtoken");
const User = require("../models/user")
const UserAuth = async(req, res, next)=>{
       try{const {token} = req.cookies
       if(!token){
      return res.status(401).send("please login ")
       }
       const decodeObj = await jwt.verify(token, "Dev@tinder790");
       const {_id} = decodeObj;

       const user = await User.findById(_id);
       if(!user){
        throw new Error("user not found");
       }
       req.user = user
       next();}
       catch(err){
        res.status(400).send("Error:" + err.message);
       }
}

module.exports = { UserAuth}