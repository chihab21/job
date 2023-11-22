import express from 'express'
const router=express.Router()
import users from '../Controlers/userController.js'
import auth from '../middleware/auth.js'


router.get('/all',users.alluser)
router.get('/single/:id',users.singleuser)
router.put('/edit/:id',users.edituser)
router.delete('/delet/:id',auth.verifyToken,users.delet)

router.get('/test',auth.verifyToken,auth.isAdmin,(req,res)=>{
    res.send('test')
})

router.post('/JobHistory',auth.verifyToken,users.createjobHistory)








export default router