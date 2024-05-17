const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuthenticated = require('../middleware/auth');

// Admin Signin Routes
router.get('/signin', adminController.getSignIn);
router.post('/signin', adminController.postSignIn);

// Protect routes with the isAuthenticated middleware otherwise will see the signin page
router.use(isAuthenticated);

// Admin Dashboard Route
router.get('/dashboard', adminController.getDashboard);

// New Admin Route
router.get('/new-admin', adminController.getNewAdmin);
router.post('/new-admin', adminController.postNewAdmin);

// Orders Route
router.get('/orders', adminController.getOrders);

// Customers Route
router.get('/customers', adminController.getCustomers);

// Admin Sign-out Route
router.get('/signout', adminController.getSignOut);

// Default route to sign-in page
router.get('/', (req, res) => {
  res.redirect('/admin/signin');
});

// Catch all  wrong route to render 404
router.use((req, res) => {
  res.status(404).render('404');
});

module.exports = router;
