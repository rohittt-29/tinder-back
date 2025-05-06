const express = require('express');

const app = express();



app.use("/test",(req,res)=>{
    res.send("sorry sorry sorry !")
})

app.use("/rohityaa",(req,res)=>{
    res.send("kya bolte server bhai!")
})

app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})