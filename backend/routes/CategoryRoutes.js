import express from 'express';
import authenticateToken from '../middleware/AuthenticateToken.js';
import authorizeAdmin from '../middleware/AuthorizeAdmin.js';
import { Category } from '../models/CategoryModel.js';

const router = express.Router();

//get all categories
router.get('/', authenticateToken, async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories: categories });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//Admin Only Routes
//add a new category
router.post('/add-category', authenticateToken, authorizeAdmin, async (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.image) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const { title, description, image } = req.body;
        const newCategory = new Category({
            title,
            description,
            image
        });
        
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully!'});
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//delete a category
router.delete('/delete-category/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Category.findByIdAndDelete(id);
    
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