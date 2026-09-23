const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({

username:{
        type:String,
        required:true,
        unique:true
    },
   email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
},

    password:{
        type:String,
        required:true,
        
    }
})
const userModel = mongoose.model("User",userSchema)
module.exports = userModel