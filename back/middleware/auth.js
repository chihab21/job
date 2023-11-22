import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
   if (!token) {
    res.status(401).send('Authentication required.');
    return;
    }
   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
    res.status(403).send('Invalid token.');
    return;
    }
   req.user = decoded;
    next();
    });
   };

   const isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        if(user.role!==1){
            res.status(401).json({
                message:'Not AdMIN'
            })

        }else{
            next()
        }

        
    } catch (error) {
        res.status(401).json({
            message:'error',
            error
        })
        
        
    }

   }

  
   export default {verifyToken,isAdmin}