import User from '../Models/userModel.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
const Register=async(req,res)=>{
    const {email}=req.body
    const userexist= await User.findOne({email})
    if(userexist){
      return  res.status(400).json({
            message:'already Registed'
        })
    }
    try {
        const user= await User.create(req.body)
        const salt=10
        const hashpwd=bcrypt.hashSync(user.password,salt)
         user.password=hashpwd
        user.save()
        res.status(201).json({
            success:true,
            message:'Register success',
            user
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error',
            error
        })
        
    }
    


}
const Login=async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user){
      return  res.status(400).json({
            message:'  User Not Found  Please Register'
        })
    }
    try {
        const match=bcrypt.compare(user.password,password)
        if(!match){
            return res.status(401).json({
                message:'please verify passowrd'
            })

        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true });

        res.json({
            message:'Login success',
            token
        })


        
        
    } catch (error) {
        res.status(401).json({
            message:'error',
            error
        })
        
    }
    


}
const userProfile = async(req, res, next) => {
    const user=await User.findById(req.user._id).select('-passowrd')
    res.status(201).json({
        message:'success',
        user
    })
    next()

   
};
const Logout=(req,res)=>{
    res.clearCookie('token')
    res.status(201).json({
        success:true,
        message:'logged out'
    })
}



export default {Register,Login,Logout,userProfile}