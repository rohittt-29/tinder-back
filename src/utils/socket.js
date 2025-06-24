const socket  = require("socket.io")
const crypto = require("crypto");
const chat = require("../models/chat");

const getSecretRoomId = (userId,TargetUserId)=>{
  return  crypto
  .createHash("sha256")
  .update([userId, TargetUserId].sort().join("_"))
  .digest("hex");
}
const initializeSocket =(server)=>{
    const io = socket(server , {
        cors: {
      origin: [
        "http://localhost:5173",
        "https://togetha-web.vercel.app"
      ],
      credentials: true,
      methods: ["GET", "POST"]
    }
    });
    io.on("connection", (socket)=>{
       
        socket.on("joinChat", ({firstName,userId, TargetUserId})=>{
           const roomId = getSecretRoomId(userId,TargetUserId);
           console.log(firstName+  " Joined Room :" + roomId);
           socket.join(roomId)
        });
        socket.on("sendMessage",async ({
                   firstName, userId,TargetUserId,text
        })=>{
                       const roomId = getSecretRoomId(userId,TargetUserId)
                       console.log(firstName + " " + text);
                       try {
                        let Chat = await chat.findOne({
                            participants: {$all:[userId,TargetUserId]},
                        });
                        if(!Chat){
                            Chat = new chat({
                                participants:[userId,TargetUserId],
                                message:[],
                            });
                        }
                        Chat.messages.push({
                            senderId: userId,
                            text,
                         });
                         await Chat.save();
                       } catch (err) {
                         console.log(err)
                       }

             io.to(roomId).emit("messageReceived" ,{firstName,text})
        });
        socket.on("disconnect",()=>{

        })
    })
}
module.exports = initializeSocket