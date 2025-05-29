  const validator = require("validator");

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

  module.exports = {validateSignupData};