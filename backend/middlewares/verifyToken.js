import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config();

export const verifyToken=(...allowedRoles)=>{
    return async(req,res,next)=>{
    try{ 
    // read token from req
    let token=req.cookies.token
    if(token===undefined){
        return res.status(400).json({message:"unauthorized req, plz login"})
    }
    // verify the validity of the token
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    // forward req to next middlewarecheck  
    // check if role is allowed
    if(!allowedRoles.includes(decodedToken.role)){
        return res.status(403).json({message:"Forbidden. You don't have acces"})
    }

    // attach user info to req for use in routes
    req.user=decodedToken;
    next()
    } catch(err){
        // jwt.verify throws if token is invalid/expired
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({message:"Session expired, please login again"})
        }
        if(err.name==="JsonWebTokenError"){
            return res.status(401).json({message:"invalid token, please login again"})
        }
        // next(err)
    }
}
}