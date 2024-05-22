const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isCustomer } = require('../middleware/auth');


// Protect routes with the isAdmin middleware otherwise will see the signin page
router.use(isCustomer);


router.get('/', cartController.getCart);
router.delete('/', cartController.deleteCart);
router.post('/item', cartController.addCartItem);
router.put('/item', cartController.updateCartItem);
router.delete('/item', cartController.deleteCartItem);



module.exports = router;
