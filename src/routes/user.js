const express = require('express');
const { UserAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/ConnectionRequest');
const userRouter = express.Router();
    User_Safe_Data = "firstName lastName age photoUrl gender about skills"
const User = require("../models/user");


userRouter.get("/user/request/receive", UserAuth , async(req,res)=>{
    try{
    const user = req.user;
    const request  = await ConnectionRequest.find({
     toUserId: user._id,
     status: "interested",
    }).populate("fromUserId", ["firstName","lastName","photoUrl","about", "age", "skills"]);;
    res.json({
        message: "Data fetched succesfully",
        data: request,
    })
}

catch(err){
req.statusCode(400).send("ERROR: " + err.message);
}
});

userRouter.get("/user/connections", UserAuth, async(req, res)=>{
    try{
    const user = req.user;

    const request = await ConnectionRequest.find({
        $or:[
            {toUserId: user._id, status: "accepted"},
            {fromUserId: user._id, status: "accepted"},
        ],
    }).populate("fromUserId", User_Safe_Data)
    .populate("toUserId", User_Safe_Data);
   
    const data = request.map((row)=> {
        if(row.fromUserId._id.toString()=== user._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId
    }); 
    res.json({data});
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
});

userRouter.get("/feed", UserAuth, async(req,res)=>{
    try{
const logenInUser = req.user;

const page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit) || 10;
limit  = limit>50 ? 50 :limit;
const skip = (page -1)*limit;

const request = await ConnectionRequest.find({
    $or:[{fromUserId: logenInUser._id}, {toUserId: logenInUser._id}],
}).select("fromUserId toUserId");

const hideUserFromFeed = new Set();
request.forEach((req) =>{
    hideUserFromFeed.add(req.fromUserId.toString());
    hideUserFromFeed.add(req.toUserId.toString());
});

const users = await User.find({
    $and:[{_id: {$nin: Array.from(hideUserFromFeed)}},
        {_id: { $ne: logenInUser._id}},
    ],
}).select(User_Safe_Data)
.skip(skip)
.limit(limit);
res.send(users);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = userRouter;