  const validator = require("validator");
const { object } = require("zod");

  const validateSignupData = (req)=>{
    const {firstName, LastName , emailId, password} = req.body;
    if(!firstName || !LastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong yaar")
    }
  };

  const validateProfileData = (req)=>{
    const allowedEditFields = ["firstName", "LastName" , "emailId", "skills","photoUrl", "gender" ,"age", "about"];
    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field)
    )

    return isEditAllowed;
  }

  module.exports = {validateSignupData, validateProfileData};