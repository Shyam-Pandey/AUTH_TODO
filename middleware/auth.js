import jwt from "jsonwebtoken"
import User from "../models/userdb.js"

const auth = async (req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message:'Login first'});
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decode._id);
    next()
}

export default auth