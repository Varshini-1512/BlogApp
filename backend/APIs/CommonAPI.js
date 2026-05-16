import exp from 'express'
import bcrypt from 'bcryptjs'
import { authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/UserModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const commonRouter=exp.Router();

// login
commonRouter.post('/login',async(req,res)=>{
    //get user cred object
    let userCred = req.body;
    //call authenticate service
    let { token, user } = await authenticate(userCred);
    //save tokan as httpOnly cookie
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    //send res
    res.status(200).json({ message: "login success", payload: user });
})

// logout
commonRouter.get('/logout',async(req,res)=>{
    // clear the cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true, //must match original settings
        secure:true, //must match original settongs
        sameSite:'none'
    })
    res.status(200).json({message:'logged out successfully'})
})

// change password
commonRouter.put('/change-password',async(req,res)=>{
    // get current password and new password
    const {email,oldpassword,newpassword}=req.body
    const DBdata=await UserTypeModel.findOne({email})
    // check the current password is correct
    const comparePassword=await bcrypt.compare(oldpassword,DBdata.password)
    if(!comparePassword){
        return res.status(400).json({message:"enter the correct password"})
    }
    // replace the current password with new password
    const hashedPassword=await bcrypt.hash(newpassword,10)
    DBdata.password=hashedPassword
    DBdata.save();
    // send res
    res.status(200).json({message:"password updated successfully"})  
})

// page refresh
commonRouter.get("/check-auth",verifyToken("USER","AUTHOR"),async(req,res)=>{
    res.status(200).json({
        message:"authenticated",payload:req.user
    })
})