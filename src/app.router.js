import connectDB from '../db/connection.js';
import categoriesRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import authRouter from './modules/auth/auth.router.js';
import subcategoryRouter from './modules/subcategory/subcategory.router.js';

import cors from 'cors';

const initApp = (app,express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req,res)=>{
        return res.status(200).json({massage:"success"})
    })

    app.use('/auth', authRouter)
    app.use('/categories', categoriesRouter)
    app.use('/subcategories', subcategoryRouter)

    app.use('/products', productRouter)

    app.use('*', (req,res) =>{
        return res.status(404).json({massage: "page not found"});
    })
}

export default initApp;