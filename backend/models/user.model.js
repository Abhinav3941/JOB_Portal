// creating scehmas 

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

   fullname:{
    type: String,
    required: true
   },

    phone_Number:{
    type: String,
    required: true,
    unique: true,
    },
   email:{
    type: String,
    required: true,
    unique: true,
   },
   password:{
    type: String,
    required: true
   },
   role:{
    type: String,
    
    enum:['Student' ,'Recruiter'],

    
    required: true
   },
   Profile:{
    bio:{type:String},
    skills:[{type:String}],
    resumeOriginalName:{type:String},
    resume:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId , ref :'company'},

    profile_pic : {
        type: String,
        default:""
    }
    
   } 
},{timestamps:true});

export const User = mongoose.model("User" , UserSchema);