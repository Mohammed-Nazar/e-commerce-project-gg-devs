const express = require('express');
const router = express.Router();
const signController = require('../controllers/signController');

// Admin Signin Routes
router.get('/signin', signController.getSignIn);
router.post('/signin', signController.postSignIn);
router.get('/register', signController.getRegisterCustomer);
router.post('/register', signController.postRegisterCustomer);
router.get('/signout', signController.getSignOut);

module.exports = router;