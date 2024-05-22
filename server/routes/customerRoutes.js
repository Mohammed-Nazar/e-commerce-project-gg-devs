const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { isCustomer } = require('../middleware/auth');

// Protect routes with the isCustomer middleware
router.use(isCustomer);

// Customer Home Route
router.get('/home', customerController.getHome);

// Customer
router.get('/profile', customerController.customerProfile);
router.post('/profile/update', customerController.profileUpdate);


// Customer Cart Route
router.get('/cart', customerController.getCart);
router.post('/cart/add', customerController.addToCart);
router.post('/cart/remove', customerController.removeFromCart);
router.post('/cart/update', customerController.updateCart);

// Single Item Route
router.get('/item/:id', customerController.getSingleItem);

// Checkout Route
router.get('/checkout', customerController.getCheckout);
router.post('/checkout', customerController.postCheckout);

module.exports = router;
