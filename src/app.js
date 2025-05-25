
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const User = require("./models/user")


app.use(express.json());
app.post("/signup", async(req, res)=>{
    const user = new User(req.body);
    // const user = new User({
        // firstName: "sachin",
        // lastName: "tendulkar",
        // emailId: "sachin93352.com",
        // password: "sachin1234"
    // });
    await user.save();
    res.send("user aagye oyeee");
});

app.get("/user", async(req, res)=>{
    const Useremail = req.body.emailId;

    const user = await User.findOne({emailId: Useremail});
    if(!user){
        res.status(404).send("user not found");
    } else{
        res.send(user);
    }
})

connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
