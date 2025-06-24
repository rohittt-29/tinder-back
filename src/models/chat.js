const mongoose = require("mongoose");
const user = require("./user");
const { string } = require("zod");


const messageSchema = new mongoose.Schema({
      senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:user,
        required: true,
      },
      text: {
        type: String,
        required: true,
      }
},{
    timestamps: true,
});

const chatSchema = new mongoose.Schema({
  participants:[{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},],

  messages:[messageSchema],
});



module.exports = mongoose.model("chat" ,chatSchema)