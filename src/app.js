
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const User = require("./models/user")

app.post("/signup", async(req, res)=>{
    const user = new User({
        firstName: "rohit",
        lastName: "mali",
        emailId: "rm2193352.com",
        password: "rohit1234"
    });
    await user.save();
    res.send("user aagye oyeee");
});

connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
