import express from 'express';
import authenticateToken from '../middleware/AuthenticateToken.js';
import authorizeAdmin from '../middleware/AuthorizeAdmin.js';
import { Product } from '../models/ProductModel.js';

const router = express.Router();

//get all products
router.get('/', /*authenticateToken,*/ async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    categoryId: 1,
                    shortDescription: 1,
                    price: 1,
                    firstImage: { $arrayElemAt: ["$images", 0] }
                }
            }
        ]);
        
        return res.status(200).json({ products });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//get single product by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        const recommendedProducts = await Product.aggregate([
            {
                $match: { 
                    category: product.category, 
                    _id: { $ne: product._id } // Exclude the current product
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    shortDescription: 1,
                    price: 1,
                    firstImage: { $arrayElemAt: ["$images", 0] } // Get the first image from array
                }
            },
            { $limit: 3 } // Limit to top 3 recommendations
        ]);

        return res.status(200).json({ product, recommendedProducts });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//post ratings
router.put('/rate-product/:id', async (req, res) => {
    if (!req.body.userId || !req.body.rating) {
        return res.status(400).json({ message: "Some input fields are missing!!"});
    }

    try {
        const id = req.params.id;
        const { userId, rating } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const existingRating = product.rating.find(r => r.userId === userId);

        if (existingRating) {
            existingRating.rating = rating;
        } else {
            product.rating.push({ userId, rating });
        }

        await product.save();
        res.status(200).json({ message: 'Rating updated successfully.', product });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Admin Only Routes
//add a product
router.post('/add-product', /*authenticateToken, authorizeAdmin,*/ async (req, res) => {
    if(!req.body.title || !req.body.shortDescription || !req.body.fullDescription || !req.body.price 
        || !req.body.stock || !req.body.categoryId || !req.body.features || !req.body.specs
    ) {
        console.log(req.body);
        return res.status(400).send({ message: 'Some required fields are missing!!', });
    }

    try {
        const { title, shortDescription, fullDescription, price, stock, categoryId, images, features, specs } = req.body;
        const newProduct = new Product({
            title,
            shortDescription,
            fullDescription,
            price,
            stock,
            categoryId, 
            images,
            features,
            specs
        });
        
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//edit product
router.put('/edit-product/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.price || !req.body.stock
        || !req.body.categoryId
    ) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const id = req.params.id;
        const existingProduct = await Product.findByIdAndUpdate(id, req.body);

        if(!existingProduct) {
            return res.status(404).json({ message: 'Product not found.', product: existingProduct });
        }

        res.status(201).json({ message: 'Product updated successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

//delete a product
router.delete('/delete-product/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(201).json({ message: 'Product deleted successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: "Server error" , error});
    }
});

export default router;