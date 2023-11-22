import mongoose from "mongoose";




const jobsHistorychema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        maxlength:70

    },
    description:{
        type:String,
        trim:true,

    },  
    location:{
        type:String,
        trim:true,

    },salary:{
        type:String,
        trim:true,

    },

    user:{
        type:mongoose.ObjectId,
        ref:"User",
       
       

    },
    interviewDate:{
        type:Date,
       

    },
    applicationSatutus:{
        type:String,
        enum:['pending',"accepted","rejected"],
        default:"pending"

    },
    
    
   
   
},{timestamps:true})

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:[true,'firstname is required'],
        maxlength:32

    },
    lastname:{
        type:String,
        trim:true,
        required:[true,'lastname is required'],
        maxlength:32

    }, email:{
        type:String,
        trim:true,
        required:[true,'email is required'],
        unique:true

    }, password:{
        type:String,
        trim:true,
        required:[true,'passwored is required'],
        minlength:[6,'minimum 6 chr']

    },
    role:{
        type:Number,
        default:0
       

    },
    jobHistory:[jobsHistorychema]

},{timestamps:true})


const  User=mongoose.model('User',userSchema)
export default User