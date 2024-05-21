const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const itemControllers = require('../controllers/itemControllers');
const { isAdmin } = require('../middleware/auth');


// Protect routes with the isAdmin middleware otherwise will see the signin page
router.use(isAdmin);


// Admin Dashboard Route
router.get('/dashboard', adminController.getDashboard);

// New Admin Route
router.get('/new-admin', adminController.getNewAdmin);
router.post('/new-admin', adminController.postNewAdmin);


// Create New item
router.post("/new-item", itemControllers.createItem);


// Orders Route
router.get('/orders', adminController.getOrders);

// Customers Route
router.get('/customers', adminController.getCustomers);

// // Admin Sign-out Route
// router.get('/signout', adminController.getSignOut);

// Default route to sign-in page
router.get('/', (req, res) => {
  if (req.session && req.session.admin) {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/signin');
  }});

// Catch all  wrong route to render 404
// router.use((req, res) => {
//   res.status(404).render('404');
// });

module.exports = router;
