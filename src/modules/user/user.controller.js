
import userModel from "../../../db/model/user.model.js";


export const getUsers = async(req,res) => {

    const users = await userModel.find({});
        return res.status(200).json({message:"successs", users});
  
}

export const getUserData = async(req,res) => {

    const user = await userModel.findById(req.user._id);
        return res.status(200).json({message:"successs", user});
  
}


