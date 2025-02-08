import express from 'express';
import authenticateToken from '../middleware/AuthenticateToken.js';
import { Cart } from '../models/CartModel.js';

const router = express.Router();

//get a cart
router.get('/:id', /*authenticateToken,*/ async (req, res) => {
    try {
        const { id } = req.params;
        
        const cart = await Cart.findOne({ userId: id });

        if(!cart) {
            cart = new Cart({
                userId,
                items: [],
                cartTotal: 0
            });
        }

        return res.status(200).json({ cart });
    }
    catch(error) {
        res.status(500).json({ message: "Server error" });
    }
});

//add items to cart
router.put('/add-to-cart', /*authenticateToken,*/ async (req, res) => {
    if(!req.body.userId || !req.body.productId || !req.body.quantity || !req.body.price || !req.body.productTitle || !req.body.productImage) {
        return res.status(400).send({ message: 'Some required fields are missing!!'});
    }

    try {
        const { userId, productId, quantity, price, productTitle, productImage } = req.body;
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
            cart.items.push({ productId, quantity, price, productTitle, productImage });
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
        res.status(500).json({ message: "Server error", error });
    }
});

//route to update cart product quantity
router.put('/update-quantity/:id', /*authenticateToken,*/ async (req, res) => {
    if(!req.body.userId) {
        return res.status(404).json({ message: 'Some required fields are missing' });
    }

    try {
        const { id } = req.params;
        const { userId, add } = req.body;

        let cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === id
        );

        if(itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart!"});
        }

        if(add === 1) {
            cart.items[itemIndex].quantity += 1;
        }
        else if(add === 0) {
            cart.items[itemIndex].quantity -= 1;
        }

        await cart.save();
        res.status(200).json({ message: 'Quantity updated successfully' });
    }
    catch(error) {
        res.status(500).json({ message: 'Server error', error });
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
        res.status(500).json({ message: "Server error", error });
    }
}); 

export default router;