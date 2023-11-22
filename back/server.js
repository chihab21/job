import express, { query } from 'express'
import mongoose, { set } from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './Routes/authRoutes.js'
import dotenv from 'dotenv'
import userroute from './Routes/userRoutes.js'
import JobtRoute from './Routes/JobtRoutes.js'
import Job from './Models/jobModel.js'
import JobType from './Models/JobTypeModel.js'
import auth from './middleware/auth.js'

dotenv.config()



const app=express()

// Connect to DB
const connect=()=>{
    mongoose.connect( 'mongodb+srv://rahma:azerty@cluster0.g42odnv.mongodb.net/' )
    .then(
        ()=>{
            console.log('connected to db !');
        }
    )
    .catch(
        ()=>{
            console.log('error in connection');
        }
    )
}
connect()
//Midleware
app.use(bodyParser.json({limit:'5mb'}))
app.use(bodyParser.urlencoded({
    limit:'5mb',
    extended:true
}))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/auth',authRoutes)
app.use('/user',userroute)
app.use('/JobT',JobtRoute)



app.get('/',(req,res)=>{
    res.send('hello chihab')
}).listen(8000,()=>console.log('server is runninfg on Port 8000'))
app.post('/jobs/cre',auth.verifyToken,async(req,res)=>{

    try {
        const jobs= await Job.create({
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            salary:req.body.salary,
            JobType:req.body.JobType,
            user:req.user._id

        })
      
        res.status(201).json({
            message:'success',
            success:true,
            jobs

        })
        
    } catch (error) {
        res.status(401).json({
            message:'error',
            success:false,
            

        })
        console.log(error)
       
    }
})

app.put('/jobs/update/:id',async(req,res)=>{

    try {
        const job= await Job.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('JobType','JobName').populate('user',"firstname lastname")
      
        res.status(201).json({
            message:'success',
            success:true,
            job

        })
        
    } catch (error) {
        res.status(201).json({
            message:'error',
            success:false,
            err:error

        })
       
    }
})
app.get('/jobs/singlejob/:id',async(req,res)=>{

    try {
        const job= await Job.findById(req.params.id)
      
        res.status(201).json({
            message:'success',
            success:true,
            job

        })
        
    } catch (error) {
        res.status(40).json({
            message:'error',
            success:false,
            err:error

        })
       
    }
})
app.delete('/jobs/delet/:id',async(req,res)=>{
    try {
        const delet=await Job.findByIdAndDelete(req.params.id)
        res.status(201).json({
            message:'deleted',
            delet
        })
    } catch (error) {
        res.status(201).json({
            message:'error',
            err:error
        })
        
    }

})
app.get('/jobs/all',async(req,res)=>{

    let jobt=[]
    const jobtypr=await Job.find({},{JobType:1})
    jobtypr.forEach((val)=>{
        jobt.push(val.JobType)

    })
    
  

  let locations=[]
  const jobbylocation=await Job.find({},{location:1})
  jobbylocation.forEach((val)=>{
    locations.push(val.location)
  })
let setuniquelocation=[...new Set(locations)]

let location=req.query.location
let locationfilter= location!==''? location:setuniquelocation

   
   
    const pagesize=10
    const page=Number(req.query.pageNumber)||1
    const count=await Job.find({location:locationfilter}).countDocuments()

    try {
      
    const jobs= await Job.find({location:locationfilter}).skip(pagesize*(page-1)).limit(pagesize)



    

        res.status(201).json({
            message:'success',
            success:true,
            jobs,
            jobtypr,
            
            page,
            pages:Math.ceil(count/pagesize),
            count,
            setuniquelocation
           
           
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error',
            success:false,

        })
       
    }
})

app.get('/jobs/allbytitle',async(req,res)=>{


  
 
       const { title } = req.query;
  
       const query = {};
       if (title) {
         query.title = { $regex: new RegExp(title, 'i') }; 
       }
    
       
      

      
     
      const pagesize=10
      const page=Number(req.query.pageNumber)||1
      const count=await Job.find({...query}).countDocuments()
  
      try {
        
      const jobs= await Job.find({...query}).skip(pagesize*(page-1)).limit(pagesize)
  
  
  
      
  
          res.status(201).json({
              message:'success',
              success:true,
              jobs,
              
              page,
              pages:Math.ceil(count/pagesize),
              count,
             
             
          })
          
      } catch (error) {
          res.status(401).json({
              message:'error',
              success:false,
  
          })
         
      }
  })

 