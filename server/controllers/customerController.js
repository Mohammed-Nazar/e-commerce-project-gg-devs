const ShopItem = require('../models/ShopItem');
const cart = require('../models/cart');
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
exports.getCart = async (req, res) => {
  const customer = req.session.customer;

  try {
    const cartItems = await cart.find({ customerID: customer._id });

    let itemsArray = [];
    // Loop through each item in the cart and fetch its details from the shopItem collection
    for (const item of cartItems) {
      let shopItem = await ShopItem.findOne({ _id: item.itemID });
      shopItem = {
        ...shopItem,
        quantity: item.quantity
      }
      if (shopItem) {
        // Push the fetched item details to the itemsArray
        itemsArray.push(shopItem);
      }
    }

    // Pass the itemsArray to the view for rendering
    res.render('customer/cart', { cart: itemsArray, customer, cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
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
exports.getCheckout = async (req, res) => {
  const customer = req.session.customer;
    const cartItems = await cart.find({ customerID: customer._id });

    let itemsArray = [];
    // Loop through each item in the cart and fetch its details from the shopItem collection
    for (const item of cartItems) {
      let shopItem = await ShopItem.findOne({ _id: item.itemID });
      shopItem = {
        ...shopItem,
        quantity: item.quantity
      }
      if (shopItem) {
        // Push the fetched item details to the itemsArray
        itemsArray.push(shopItem);
      }
    }
  res.render('customer/checkout', { cart: req.session.cart, customer, itemsArray, cartItems });
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