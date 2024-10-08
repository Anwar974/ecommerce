import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
        
    },
   products:[{
    productId:{type:Types.ObjectId, ref:'Product', required:true},
    quantity:{type:Number, default:1},
   }],
    createdBy:{type:Types.ObjectId, ref:'User'},
    updatedBy:{type:Types.ObjectId, ref:'User'}
    
},
{
    timestamps:true,
});
const cartModel = model('Cart',cartSchema);
export default cartModel;

