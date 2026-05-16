import { UserTypeModel } from "../models/UserModel.js";

export const checkAuthor=async (req,res,next)=>{
    // get author id
    let authorid=req.body?.author || req.params.authorid
    // verify author 
    const author= await UserTypeModel.findById(authorid)
    // if author not found
    if(!author ||author.role!=="AUTHOR"){
        res.status(401).json({message:"Invalid author"})
    }
    // if autgor found but role is diff
    if(author.role!=='AUTHOR')
        return res.status(403).json({message:"user is not found",})
    // if author blocked
    if(!author.isActive)
        return res.status(403).json({message:"author account is not active "})
    // forward req to next
    next();
}