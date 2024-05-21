const Cart = require('../models/cart');

// Get cart for the current customer
exports.getCart = async (req, res) => {
    try {
        const customerId = req.session.customer._id; // Using session to get the customer ID
        const cart = await Cart.findOne({ customerRef: customerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete cart for the current customer
exports.deleteCart = async (req, res) => {
    try {
        const customerId = req.session.customer._id; // Using session to get the customer ID
        await Cart.findOneAndDelete({ customerRef: customerId });

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add an item to the cart
exports.addCartItem = async (req, res) => {
    try {
        const customerId = req.session.customer._id; // Using session to get the customer ID
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ customerRef: customerId });

        if (!cart) {
            cart = new Cart({ customerRef: customerId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.itemId === itemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ itemId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an item in the cart
exports.updateCartItem = async (req, res) => {
    try {
        const customerId = req.session.customer._id; // Using session to get the customer ID
        const { itemId, quantity } = req.body;

        const cart = await Cart.findOne({ customerRef: customerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.itemId === itemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    try {
        const customerId = req.session.customer._id; // Using session to get the customer ID
        const { itemId } = req.body;

        const cart = await Cart.findOne({ customerRef: customerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.itemId !== itemId);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
