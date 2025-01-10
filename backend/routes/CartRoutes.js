import express from 'express';
import authenticateToken from '../middleware/AuthenticateToken.js';
import { Cart } from '../models/CartModel.js';

const router = express.Router();

//get a cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ userId });

        if(!cart) {
            return res.status(404).json({ message: 'Cart does not exist.'});
        }

        return res.status(200).json({ cart });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//add items to cart
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    if(!req.body.userId || !req.body.productId || !req.body.quantity || !req.body.price) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const { userId, productId, quantity, price } = req.body;
        let cart = await Cart.findOne({ userId });
        if(!cart) {
            cart = new Cart({
                userId,
                items: [],
                cartTotal: 0
            });
        }

        //check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if(existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].price = price;
        }
        else {
            cart.items.push({ productId, quantity, price });
        }

        //Recalculate cart total
        cart.cartTotal = cart.items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );

        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully.', cart });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//remove an item from cart
//router.delete can also be used here
//but because here we update the cart i prefer router.put
router.put('/delete-item/:id', authenticateToken, async (req, res) => {
    if(!req.body.userId) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const productId = req.params.id;
        const userId = req.body.userId;

        let cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        //find item in cart
        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if(itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart!"});
        }

        const itemToRemove = cart.items[itemIndex];
        cart.cartTotal -= itemToRemove.price * itemToRemove.quantity;

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({ message: "Item removed from cart successfully!", cart });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
}); 

export default router;