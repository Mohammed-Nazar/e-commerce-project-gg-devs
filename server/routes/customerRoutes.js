const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController')
const { isCustomer } = require('../middleware/auth');

// Protect routes with the isCustomer middleware
router.use(isCustomer);


// Customer Cart Route
router.post('/cart/add', cartController.addCartItem);
router.get('/cart/remove/:id', cartController.deleteCartItem);
router.post('/cart/update', cartController.updateCartItem);
router.get('/cart', customerController.getCart);

// Customer Home Route
router.get('/home', customerController.getHome);

// Customer
router.get('/profile', customerController.customerProfile);
router.post('/profile/update', customerController.profileUpdate);

// orders
router.get('/orders', customerController.getOrders);


// Single Item Route
router.get('/item/:id', customerController.getSingleItem);

// Checkout Route
router.get('/checkout', customerController.getCheckout);


// payment routes
router.get('/payment', customerController.getPayment);
router.post('/payment/success', customerController.paymentSuccess);

module.exports = router;
