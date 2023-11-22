import mongoose from "mongoose";

const jobschema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'title is required'],
        maxlength:70

    },
    description:{
        type:String,
        trim:true,
        required:[true,'description is required'],

    },  
    location:{
        type:String,
        trim:true,
        required:[true,'location is required'],

    },salary:{
        type:String,
        trim:true,
        required:[true,'description is required'],

    },
    avaible:{
        type:Boolean,
        default:true
       

    },
    user:{
        type:mongoose.ObjectId,
        ref:"User",
       
       

    },JobType:{
        type:mongoose.ObjectId,
        ref:'JobType',
        required:true

    }
    
   
   
},{timestamps:true})


const  Job=mongoose.model('Job',jobschema)
export default Job