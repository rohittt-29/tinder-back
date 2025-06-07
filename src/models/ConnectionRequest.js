const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:["ignored" , "interested" , "accepted" , "rejected"],
            message:`{VALUES} is incorrect status type`,
        },

    },
},

{timestamps:true}
);

connectionRequestSchema.pre("save", function(next){
    const ConnectionRequest = this;

    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
throw new Error("khudko kyu request bhej raha hai ? Pagal hai kya ? ")
    }
    next();
})

module.exports = mongoose.model("connectionRequestSchema", connectionRequestSchema)