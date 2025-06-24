const express = require("express");
const chat = require("../models/chat");
const { UserAuth } = require("../middlewares/auth");
const user = require("../models/user");

const chatRouter = express.Router();

chatRouter.get("/chat/:TargetUserId", UserAuth,async(req, res)=>{
    const {TargetUserId} = req.params;
    const userId = req.user._id;
    try {
        let Chat = await chat.findOne({
            participants: {$all: [userId, TargetUserId]},
        }).populate({
            path:"messages.senderId",
            select: "firstName LastName"
        });
        if(!Chat){
            Chat = new chat({
                participants: [userId, TargetUserId],
                messages:[]
            })
            await Chat.save();
        }
        res.json(Chat);
    } catch (err) {
        console.log(err)
    }


})


module.exports = chatRouter;