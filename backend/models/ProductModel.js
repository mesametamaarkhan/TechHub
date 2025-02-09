import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    fullDescription: {
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
    images: {
        type: [String], 
    },
    features: {
        type: [String],
    },
    specs: {
        type: Map,
        of: String, 
        required: true
    },
    reviews: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'users', 
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5 
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
