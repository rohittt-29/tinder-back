const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://devtin:0Q7KsGEuW2w2Kyk8@cluster0.riifmky.mongodb.net/devTinder");

}

module.exports = connectDB;

