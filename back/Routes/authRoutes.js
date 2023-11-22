import express from 'express'
import authcont from '../Controlers/authController.js'
import auth from '../middleware/auth.js'


const router=express.Router()

router.post('/register',authcont.Register)
router.post('/login',authcont.Login)
router.get('/logout',authcont.Logout)
router.get('/me',auth.verifyToken,authcont.userProfile)






export default router