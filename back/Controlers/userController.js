import User from '../Models/userModel.js'

const alluser=async(req,res)=>{
    const pagesize=10
    const page=Number(req.query.pageNumber)||1
    const count=await User.find({}).estimatedDocumentCount()
    try {
        const users=await User.find().sort({created:-1}).select('-passowrd').skip(pagesize*(page-1)).limit(pagesize)
        res.status(201).json({
            success:true,
            users,
            page,
            pages:Math.ceil(count/pagesize),
            count
        })


        
    } catch (error) {
        
    }

}
const singleuser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        res.status(201).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'erroer',
            error
        })

        
    }
    

}
const edituser=async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'erroer',
            error
        })

        
        
    }

}
const delet=async(req,res)=>{
  await  User.findByIdAndDelete(req.params.id)
    res.status(201).json({
            success:true,
            message:'delted',
            
        })
  
}

const createjobHistory=async(req,res)=>{
    const {title,description,location,salary}=req.body
    try {
        const curentUser=await User.findOne({_id:req.user._id})
        if(!curentUser){
            res.status(401).json({
                message:'you must login '
            })
        }
        const addHistory={
            title,
            description,
            location,
            salary
            ,user:req.user._id
        }
        curentUser.jobHistory.push(addHistory)
        await curentUser.save()
        res.status(201).json({
            message:'success',
            curentUser
        })

        
    } catch (error) {
        res.status(401).json({
            message:'error',
            err:error
        })
        console.log(error)

        
    }

}

export default {alluser,singleuser,edituser,delet,createjobHistory}