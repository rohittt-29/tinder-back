const adminAuth = (req, res, next)=>{
    console.log("admin auth ho raha hai yaar");
    const token = "xyz";
    const isadmin = token === "xyzdfddh";
    if(!isadmin){
        res.status(401).send("abhe unauthorized request hai yaar");
    } else{
        next();
    }
}
const UserAuth = (req, res, next)=>{
    console.log("admin auth ho raha hai yaar");
    const token = "xyz";
    const isUser = token === "xyz";
    if(!isUser){
        res.status(401).send("abhe bakwas request hai yaar");
    } else{
        next();
    }
}

module.exports = {adminAuth , UserAuth}