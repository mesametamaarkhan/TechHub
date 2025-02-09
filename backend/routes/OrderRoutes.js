import express from 'express';
import { Order } from '../models/OrderModel.js';
import { Cart } from '../models/CartModel.js';
import authenticateToken from '../middleware/AuthenticateToken.js';
import authorizeAdmin from '../middleware/AuthorizeAdmin.js';

const router = express.Router();

//get all orders for specific user
router.get('/:id', /*authenticateToken,*/ async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ userId: id });
        res.status(200).json({ orders });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//create order
//need to look at this again
//this is working without the payment method stuff
router.post('/create-order', /*authenticateToken,*/ async (req, res) => {
    if(!req.body.shippingAddress || !req.body.paymentMethod || !req.body.tax || !req.body.userId ) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const { userId, shippingAddress, paymentMethod, tax } = req.body;

        const cart = await Cart.findOne({ userId });
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty. Add items before placing an order." });
        }


        const subtotal = cart.cartTotal;
        const totalAmount = subtotal + tax + 15.99;

        const newOrder = new Order({
            userId: userId,
            items: cart.items,
            shippingAddress,
            paymentMethod,
            subtotal,
            tax,
            totalAmount,
            status: "Pending"
        });

        // let paymentResult;
        // if(paymentMethod === 'creditcard') {
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         amount: Math.round(totalAmount * 100),
        //         currency: 'usd',
        //         source: tokenId,
        //         confirm: true,
        //         metadata: { orderId: savedOrder._id.toString() }
        //     });
        //     paymentResult = paymentIntent;
        //
        //     savedOrder.status = 'Paid';
        //     savedOrder.transactionId = paymentIntent.id; // <-- Store the transaction ID
        //     savedOrder.status = 'Paid';
        //     await savedOrder.save();
        // }
        // else {
        //     return res.status(400).json({ message: "Unsupported payment method" });
        // }

        const savedOrder = await newOrder.save();

        // const notification = new Notification({
        //     userId: savedOrder.userId,
        //     message: `Your order with Order#${savedOrder._id} has been placed successfully!`
        // });
        // await notification.save();

        cart.items = [];
        cart.cartTotal = 0;
        await cart.save();
        res.status(201).json({ message: "Order placed successfully", savedOrder });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//get all orders
//admin only
router.get('/all-orders', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//update order status
//admin or management only
router.put('/update-order/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    if(!req.body.status) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const orderId = req.params.id;
        const status = req.body.status;

        const order = await Order.findOneAndUpdate({ _id: orderId }, { status: status });
        if(!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        const notification = new Notification({
            userId: order.userId,
            message: `Your order with Order#${order._id} has been updated to ${status}`
        });

        await notification.save();
        res.status(200).json({ message: 'Order updated successfully.' });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

//get specific order
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.find({ _id: orderId });
        if(!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
});

export default router;