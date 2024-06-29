import slugify from "slugify";
import categoryModel from "../../../db/model/order.model.js";
import subcategoryModel from "../../../db/model/subcategory.model.js";
import cloudinary from "../../ults/cloudinary.js";
import productModel from "../../../db/model/product.model.js";
import { pagination } from "../../ults/paginations.js";

export const create = async (req,res) => {
    
const {name, price, discount, categoryId, subcategoryId} = req.body;

const checkCategory = await categoryModel.findById(categoryId);

if(!checkCategory) {

return res.status(404).json({message: "category not found"});
}

const checkSubCategory = await subcategoryModel.findOne({_id:subcategoryId, categoryId:categoryId});
if(!checkSubCategory ){
return res.status (404).json({message: "Sub Category not found"});
}

req.body.slug = slugify(name);
req.body.finalPrice =  price - ((price * (discount || 0) ) / 100);

//  return res.json(req.body.finalPrice);

const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
     {folder: `${process.env.APPNAME}/product/${name}` });

req.body.mainImage = {secure_url,public_id};
req.body.subImages = [];

for (const file of req.files.subImages) {

const {secure_url,public_id} = await cloudinary.uploader.upload (file.path,
     {folder: `${process.env.APPNAME}/product/${name}/subImages` });
req.body.subImages.push({secure_url, public_id});

}
const product = await productModel.create(req.body);

return res.status(201).json({message:"success", product});
}


export const getProducts = async (req,res) => {

   
     const {skip, limit} = pagination(req.query.page, req.query.limit);
      let queryObject = {...req.query};
      const excludeQuery = ['page', 'limit', 'sort', 'search', 'fields'];

      excludeQuery.map((ele) => {
          delete queryObject[ele];
     });
     
     queryObject = JSON.stringify(queryObject);
     queryObject = queryObject.replace(/\b(gt|gte|lt|lte|in|nin|eq)\b/g, (match) => `$${match}`);
     queryObject = JSON.parse(queryObject);
 
    
     const mongoseQuery= productModel.find(queryObject).skip(skip).limit(limit);
     // .populate({
     //      path:'reviews',
     //      populate:{
     //           path: 'userId'
     //      },
     // });
     
     if(req.query.search) {
     mongoseQuery.find
     ({
          $or:[
          {name:{$regex:req.query.search}},
          {description:{$regex:req.query.search}}

          ]
     })
}
     const count =await productModel.estimatedDocumentCount();
     mongoseQuery.select(req.query.fields);
     const products = await mongoseQuery.sort(req.query.sort)

     return res.status(200).json({message:"success",count, products});




}


// export const getProducts = async (req, res, next) => {
//      try {
//          const { page = 1, limit = 2, sort, search, fields } = req.query;
//          const { skip, limit: parsedLimit } = pagination(page, limit);
 
//          let queryObject = { ...req.query };
//          const excludeQuery = ['page', 'limit', 'sort', 'search', 'fields'];
 
//          excludeQuery.forEach((ele) => {
//              delete queryObject[ele];
//          });
 
//          queryObject = JSON.stringify(queryObject);
//          queryObject = queryObject.replace(/\b(gt|gte|lt|lte|in|nin|eq)\b/g, (match) => `$${match}`);
//          queryObject = JSON.parse(queryObject);
 
//          let productsQuery = productModel.find(queryObject)
//              .skip(skip)
//              .limit(parsedLimit)
//              .populate({
//                  path: 'reviews',
//                  populate: {
//                      path: 'userId',
//                      select: 'userId -_id'
//                  }
//              });
 
//          if (fields) {
//              const fieldsArray = fields.split(',').map(field => field.trim()).join(' ');
//              productsQuery = productsQuery.select(fieldsArray);
//          }
 
//          if (search) {
//              const searchRegex = new RegExp(search, 'i'); 
//              productsQuery = productsQuery.find({
//                  $or: [
//                      { name: { $regex: searchRegex } },
//                      { description: { $regex: searchRegex } }
//                  ]
//              });
//          }
 
//          if (sort) {
//              const sortFields = sort.split(',').map(field => field.trim()).join(' ');
//              productsQuery = productsQuery.sort(sortFields);
//          } else {
//              productsQuery = productsQuery.sort('createdAt'); 
//          }
 
//          const products = await productsQuery;
//          const transformedProducts = products.map(product => ({
//              ...product.toObject(),
//              mainImage: product.mainImage.secure_url,
//              subImages: product.subImages.map(img => img.secure_url)
//          }));
 
//          return res.status(200).json({ message: "success", products: transformedProducts });
//      } catch (error) {
//          next(error);
//      }
//  };