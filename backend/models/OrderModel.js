import mongoose, { trusted } from "mongoose";

const orderSchema = mongoose.Schema({
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
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    shippingAddress: {
        type: {
            "addressLine1" : {
                type: String,
                required: true
            },
            "city": {
                type: String,
                required: true
            },
            "state": {
                type: String,
                required: true
            },
            "zipCode": {
                type: String,
                required: true
            },
            "country": {
                type: String,
                required: true
            }
        },
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    //add transaction id here
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Order = mongoose.model('order', orderSchema);