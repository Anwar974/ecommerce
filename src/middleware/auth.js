import jwt  from 'jsonwebtoken';
import userModel from '../../db/model/user.model.js';
import { AppError } from '../ults/AppError.js';
export const roles = {
    Admin:'Admin',
    User:'User'
}

export const auth = (accessRole = [])=>{
    return async (req,res,next)=>{
        
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARERTOKEN)){
            return next(new AppError(`invalid token`,401))
        }

        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token, process.env.LOGINSIG);
        
        if(!decoded){
            return next(new AppError(`invalid token`,401))

        }
        const user = await userModel.findById(decoded.id).select("userName role");
        if(!user){
            return next(new AppError(`user Not Found`,409))

        } 
        
        if (!accessRole.includes(user.role)){
            return next(new AppError(`not auth user`,403))
        }
        
        req.user = user;
        return next();
            
    

    }

}