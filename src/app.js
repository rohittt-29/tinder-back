
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
});

app.get("/feed", async(req,res)=>{
    const users = await User.find({});
    if(!users){
        res.status(404).send("user nahi mila");
    }
    else{
         res.send(users);
    }
});

app.delete("/user" , async(req, res)=>{
    const id = req.body.id;

    const user = await User.findByIdAndDelete(id);

    if(!user){
        res.status(404).send("user kaha hai.?")
    }
    else{
        res.send("user deleted succesfully")
    }
});

app.patch("/user", async(req,res)=>{
    const Useremail = req.body.emailId;
    const data = req.body;
    const user = await User.findOneAndUpdate({emailId: Useremail},data,{returnDocument:"after",runValidators:true,} )
    console.log(user)
    if(!user){
        res.status(404).send("kuch to gadbad hai")
    }
    else{
        res.send("user update hogaya")
    }
});

connectDB().then(()=>{
    console.log("database connecy hogaya bhidu");
    app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})
}).catch((err)=>{
    console.error("database connect nhi hai yaar")
})
 
