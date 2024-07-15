import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import subcategoryModel from "../../../db/model/subcategory.model.js";
import cloudinary from "../../ults/cloudinary.js";
import productModel from "../../../db/model/product.model.js";
import { pagination } from "../../ults/paginations.js";

export const create = async (req, res) => {

  const {name,price,discount,categoryId,subcategoryId} = req.body;

  const checkCategory = await categoryModel.findById(categoryId);

  if (!checkCategory) {
    return res.status(404).json({ message: "category not found" });
  }

  const checkSubCategory = await subcategoryModel.findOne({
    _id: subcategoryId,
    categoryId: categoryId,
  });
  if (!checkSubCategory) {
    return res.status(404).json({ message: "Sub Category not found" });
  }

  req.body.slug = slugify(name);
  req.body.finalPrice = price - (price * (discount || 0)) / 100;

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.image[0].path,
    { folder: `${process.env.APPNAME}/product/${name}` }
  );
  req.body.image = { secure_url, public_id };

  req.body.subImages = [];

  if (req.files.subImages){

  for(const file of req.files.subImages){
     const { secure_url,public_id}= await cloudinary.uploader.upload(
          req.files.image[0].path,
          
          {folder:`${process.env.APPNAME}/${name}/subImages`})
     req.body.subImages.push({secure_url,public_id})
 }}

//   for (const file of req.files.subImages) {
//     const { secure_url, public_id } = await cloudinary.uploader.upload(
//       file.path,
//       { folder: `${process.env.APPNAME}/product/${name}/subImages` }
//     );
//     req.body.subImages.push({ secure_url, public_id });
//   }
  const product = await productModel.create(req.body);

  return res.status(200).json({ message: "success", product });


};

export const getProducts = async (req, res) => {
  try {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    let queryObject = { ...req.query };
    const excludeQuery = ["page", "limit", "sort", "search", "fields"];

    excludeQuery.map((ele) => {
      delete queryObject[ele];
    });

    queryObject = JSON.stringify(queryObject);
    queryObject = queryObject.replace(
      /\b(gt|gte|lt|lte|in|nin|eq)\b/g,
      (match) => `$${match}`
    );
    queryObject = JSON.parse(queryObject);

    const mongoseQuery = productModel.find(queryObject).skip(skip).limit(limit);
    // .populate({
    //      path:'reviews',
    //      populate:{
    //           path: 'userId'
    //      },
    // });

    if (req.query.search) {
      mongoseQuery.find({
        $or: [
          { name: { $regex: req.query.search } },
          { description: { $regex: req.query.search } },
        ],
      });
    }
    const count = await productModel.estimatedDocumentCount();
    mongoseQuery.select(req.query.fields);
    let products = await mongoseQuery.sort(req.query.sort);

    products = products.map((product) => {
      return {
        ...product.toObject(),
        image: product.image.secure_url,
        subImages: product.subImages.map((img) => img.secure_url),
      };
    });

    return res.status(200).json({ message: "success", count, products });
  } catch (error) {
    next(error);
  }
};
