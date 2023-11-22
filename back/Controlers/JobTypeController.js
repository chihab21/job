import JobType from '../Models/JobTypeModel.js'


const createJobT=async(req,res)=>{

    try {
        const jobT= await JobType.create({
            JobName:req.body.JobName,
            user:req.user._id
        })
      
        res.status(201).json({
            message:'success',
            success:true,
            jobT

        })
        
    } catch (error) {
        res.status(401).json({
            message:'eror',
            success:false,
            

        })
       
    }
}

const alljobt=async(req,res)=>{

    try {
        const jobT= await JobType.find()
      
        res.status(201).json({
            message:'success',
            success:true,
            jobT

        })
        
    } catch (error) {
        res.status(201).json({
            message:'error',
            success:false,
            ero:error

        })
       
    }
}
export default {createJobT,alljobt}