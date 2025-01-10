import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // Referencing another document
        ref: 'categories', // Assuming there's a Category model
        required: true
    },
    images: {
        type: [String], // Array of URLs as strings
    },
    specs: {
        type: Map,
        of: String, // Key-value pairs where values are strings
        required: true
    },
    rating: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId, // Referencing another document
                ref: 'users', // Assuming there's a User model
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5 // Ratings between 1 and 5
            }
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Product = mongoose.model('product', productSchema);
