const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName:{
        type: String
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
        validate(value){
            if(!["male", "female", "others"].includes(value)){
               throw new Error("gender is not valid");
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://tse2.mm.bing.net/th?id=OIP.NMpXvvWfENJhQGxRbTF5pwHaHa&pid=Api&P=0&h=180",
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

module.exports = mongoose.model("User", userSchema)