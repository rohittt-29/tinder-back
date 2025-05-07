const express = require('express');

const app = express();



app.get("/user",(req, res)=>{
    res.send("kya bolti public")
})
  

app.post("/user",(req, res)=>{
    res.send("bantai ko lageli bhook")
})

app.delete("/user",(req, res)=>{
    res.send("abrakadabra abrakadabra")
})


app.use("/user",(req,res)=>{
    res.send("sorry sorry sorry !")
})


app.listen(9000,()=>{
    console.log("server run ho raha hai bantaiii")
})