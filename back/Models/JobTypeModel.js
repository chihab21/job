import mongoose from "mongoose";

const jobTypeschema=new mongoose.Schema({
    JobName:{
        type:String,
        trim:true,
        required:[true,'title is required'],
        maxlength:70

    },
  
    user:{
        type:mongoose.ObjectId,
        ref:"User",
        
       

    },
   
   
},{timestamps:true})


const  JobType=mongoose.model('JobType',jobTypeschema)
export default JobType