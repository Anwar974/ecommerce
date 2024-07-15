import userModel from "../../db/model/user.model.js";
import { AppError } from "../ults/appError.js";
export const checkEmail=async(req,res,next)=>{
    const {email} = req.body;
    const user= await userModel.findOne({email})
    if(user){
    // return res.status(409).json({meessage:"already exists"})
     return next(new AppError(`email already exist`,409))
    }
    next();
}