import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    items: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'products', 
                required: true
            },
            productTitle: {
                type: String,
                required: true
            },
            productImage: {
                type:String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    cartTotal: {
        type: Number,
        required: true,
        default: 0
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

export const Cart = mongoose.model('cart', cartSchema);