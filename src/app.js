
const express = require('express');
const connectDB = require("./config/database")

const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async(req, res)=>{
    try{ validateSignupData(req)
 

    const {firstName, LastName, emailId, password} = req.body

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash)

       const user = new User({
        firstName,
        LastName,
        emailId,
        password: passwordHash,
       });

    await user.save();
    res.send("user aagye oyeee");}
    catch(err){
        res.status(400).send("Error: " + err.message)
    }
   
});

app.post("/login", async(req,res)=>{
    try{
        const {emailId, password}= req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("InValid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login hogaya");
        }else{
            throw new Error("InValid Credentials")
        }
    }
      catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

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

app.patch("/user/:UserId", async(req,res)=>{
    const UserId = req.params?.UserId;
    const data = req.body;

    const allowed_Updates = ["photoUrl", "about","gender" ,"age","skills"];
    const isUpdatedAllowed = Object.keys(data).every((k)=>
    allowed_Updates.includes(k)
);
if(!isUpdatedAllowed){
    throw new Error("updates not allowed");
}
if(data?.skills.length > 10){
    throw new Error("skills can't be more than 10")
}
    const user = await User.findByIdAndUpdate({_id: UserId},data,{returnDocument:"after",runValidators:true,} )
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
 
