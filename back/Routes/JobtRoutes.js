import express from 'express'
import authcont from '../Controlers/authController.js'
import auth from '../middleware/auth.js'
import jobtcon from '../Controlers/JobTypeController.js'


const router=express.Router()


router.post('/createjobt',auth.verifyToken,jobtcon.createJobT)
router.get('/alljobt',jobtcon.alljobt)

export default router