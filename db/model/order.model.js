import mongoose, { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
        
    },
    products:[{
        productName:{
            type:String,
        },
        productId:{
        type:Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    unitPrice:{
        type:Number,
        required:true,
    },
    finalPrice:{
        type:Number,
        required:true,
    }
    }],
    fnalPrice:{
        type:Number,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        default:'cash',
        enum:['cash','card'],
    },
    couponId:{
        type:Types.ObjectId,
        ref:'Coupon',

    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','cancelled','confirmed','onway','delivered'],

    },
    notes:{
        type:String
    },
    rejectedReason:{
        type:String,

    },
    updatedBy:[{
        userId:{
          type:Types.ObjectId,
         ref:'User',
         required:true,  
        }
        
        
    }],
    
},
{
    timestamps:true,
   
});


const orderModel = model('Order',orderSchema);
export default orderModel;

