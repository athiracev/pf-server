const express= require('express')
const userController=require('../Controllers/userController')
const router= express.Router()


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

module.exports=router
