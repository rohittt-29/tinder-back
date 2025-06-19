const express = require("express")

const requestRouter = express.Router();
const {UserAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");
// const connectionRequestSchema = require("../models/ConnectionRequest")


requestRouter.post("/request/send/:status/:toUserId",UserAuth, async(req, res)=>{
try{
 const fromUserId = req.user._id;
 const toUserId = req.params.toUserId;
 const status = req.params.status;

 const allowedStatus = ["ignored", "interested"];
 if(!allowedStatus.includes(status)){
    return res.status(400).json({message: "invalid status type"})
 }

 const toUser = await User.findById(toUserId);
 if(!toUser){
    return res.status(400).json({message: "user not found"})
 }
 const exisistingRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId , toUserId:fromUserId},
    ],
 });
 if(exisistingRequest){
    return res.status(400).send({message: "connection request already exists"});
 }

 const request = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
 });

 

 const data = await request.save();

 res.json({
    message: req.user.firstName + " is " + status + " in " + toUser.firstName,
    data,
 })
  
}
catch(err){
    res.status(400).send("ERROR:" + err.message);

}
});

requestRouter.post("/request/review/:status/:requestId", UserAuth, async(req, res)=>{
   try{
      const loggedinUser = req.user;
      const {status, requestId} = req.params;
const allowedStatus = ["accepted" , "rejected"];
if(!allowedStatus.includes(status  )){
   return res.status(400).json({message: "status not valid"});
}

const request = await ConnectionRequest.findOne({
   _id: requestId,
   toUserId: loggedinUser._id,
   status: "interested",
});
if(!request){
   return res.status(404).json({message: " connection request not found"});
}

request.status = status;
const data = await request.save();
res.json({message: " connection request" + status, data})
   }
   catch(err){
      res.status(400).send("ERROR: " + err.message);
   }
})



module.exports  = requestRouter;