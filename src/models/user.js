const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        index: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName:{
        type: String,
         required: true,
    },
    emailId:{
    type: String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address : " + value);
        }
    }
    },
    password:{
        type: String,
        required:true,
         validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a Strong Password : " + value);
        }
    }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender:{
        type:String,
        enum:{
            values: ["male" , "female" , "others"],
            message:`{VALUE} is not a valid gender type`
        }
        // validate(value){
        //     if(!["male", "female", "others"].includes(value)){
        //        throw new Error("gender is not valid");
        //     }
        // }
    },
    photoUrl:{
        type: String,
        default: "https://i.kym-cdn.com/photos/images/original/001/857/748/54e.jpg",
    },
    about:{
        type: String,
        default:"this is a default about the user"
    },
    skills:{
        type:[String],
    },

},
{
    timestamps: true,
});

userSchema.methods.getJwt = async function (){
    const user  = this;

     const token = await jwt.sign({_id: user._id}, "Dev@tinder790", {expiresIn: "7d"});

     return token;
}

userSchema.methods.validatepassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema)