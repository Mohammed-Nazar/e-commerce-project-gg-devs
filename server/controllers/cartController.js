const Cart = require('../models/cart');
const customer = require('../models/customer');

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
    const { customer_id, item_id, price } = req.body;

    try {
        // Check if the item already exists in the cart
        let cartItem = await Cart.findOne({ customerID: customer_id, itemID: item_id });

        if (cartItem) {
            // If the item exists, increase the quantity
            cartItem.quantity += 1;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            // If the item doesn't exist, create a new cart item
            const newItem = new Cart({
                customerID: customer_id,
                itemID: item_id,
                price: price,
                quantity: 1 // Set initial quantity to 1
            });

            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error adding item to cart' });
    }
};

// Update an item in the cart
exports.updateCartItem = async (req, res) => {
    const { customer_id, item_id, quantity } = req.body;


    if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    try {
        // Find the cart item by customer ID and item ID
        let cartItem = await Cart.findOne({ customerID: customer_id, itemID: item_id });

        if (cartItem) {
            // If the item exists, update the quantity
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            // If the item doesn't exist, return an error
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating item in cart' });
    }
};

// Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    const {id} = req.params;
    const customer = req.session.customer;
    const customer_id = customer._id;

    try {
        // Find and delete the cart item by customer ID and item ID
        const cartItem = await Cart.findOneAndDelete({ customerID: customer_id, itemID: id });

        if (cartItem) {
            res.status(200).redirect("/customer/cart");
        } else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item from cart' });
    }
};
