const ShopItem = require('../models/ShopItem');
const Customer = require('../models/customer');

// Render Home Page
exports.getHome = async (req, res) => {
  try {
    const items = await ShopItem.find();
    const customer = req.session.customer;
    res.render('customer/home', { items, customer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Render Cart Page
exports.getCart = (req, res) => {
  const customer = req.session.customer;
  res.render('customer/cart', { cart: req.session.cart, customer });
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
  const itemId = req.body.itemId;
  const quantity = parseInt(req.body.quantity) || 1;
  const cart = req.session.cart || [];

  try {
    const item = await ShopItem.findById(itemId);
    if (item) {
      const cartItem = cart.find(cartItem => cartItem.item._id.equals(item._id));
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.push({ item, quantity });
      }
      req.session.cart = cart;
      res.json({ success: true, message: 'Item added to cart successfully!' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Item from Cart
exports.removeFromCart = (req, res) => {
  const itemId = req.body.itemId;
  const cart = req.session.cart || [];

  req.session.cart = cart.filter(cartItem => !cartItem.item._id.equals(itemId));
  res.json({ success: true, message: 'Item removed from cart successfully!' });
};

// Update Cart
exports.updateCart = (req, res) => {
  const itemId = req.body.itemId;
  const quantity = parseInt(req.body.quantity);
  const cart = req.session.cart || [];

  const cartItem = cart.find(cartItem => cartItem.item._id.equals(itemId));
  if (cartItem) {
    cartItem.quantity = quantity;
    req.session.cart = cart;
    res.json({ success: true, message: 'Cart updated successfully!' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found in cart.' });
  }
};

// Render Single Item Page
exports.getSingleItem = async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.id);
    res.render('customer/singleItem', { item });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Render Checkout Page
exports.getCheckout = (req, res) => {
  const customer = req.session.customer;
  res.render('customer/checkout', { cart: req.session.cart, customer });
};

// Handle Checkout
exports.postCheckout = async (req, res) => {
  // Checkout logic
};

// Profile
exports.customerProfile = async (req, res) => {
  const customer_id = req.session.customer_id;
  const customer = req.session.customer;
  let msg = req.session.msg;
  const customerInfo = await Customer.findById({"_id": customer_id})
  res.render('customer/profile', { cart: req.session.cart, customer, customerInfo, msg:msg });
};

exports.profileUpdate = async (req, res)=>{
  const {firstName, LastName, email} = req.body;
  const customer = await Customer.findOne({ email });
  if(!customer?.email || customer.id === req.session.customer_id){
  await Customer.updateOne({"_id": req.session.customer_id},{
    $set:{
       name: firstName + " " + LastName,
       email: email
    } 
})
req.session.msg = "Profile Updated";
res.status(200).redirect("/customer/profile")
} else {
  req.session.msg = "Email already exist";
  res.redirect("/customer/profile")
};
}