const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController')
const { isCustomer } = require('../middleware/auth');

// Protect routes with the isCustomer middleware
router.use(isCustomer);


// Customer Cart Route
router.post('/cart/add', cartController.addCartItem);
router.post('cart/remove/:id', cartController.deleteCartItem);
router.post('/cart/update', cartController.updateCartItem);
router.get('/cart', customerController.getCart);

// Customer Home Route
router.get('/home', customerController.getHome);

// Customer
router.get('/profile', customerController.customerProfile);
router.post('/profile/update', customerController.profileUpdate);




// Single Item Route
router.get('/item/:id', customerController.getSingleItem);

// Checkout Route
router.get('/checkout', customerController.getCheckout);
router.post('/checkout', customerController.postCheckout);

module.exports = router;
