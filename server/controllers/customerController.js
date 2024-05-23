const ShopItem = require('../models/ShopItem');
const cart = require('../models/cart');
const Customer = require('../models/customer');
const order = require('../models/order')

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
  
    if(cartItems.length == 0){
      res.redirect("/customer/cart")
    }

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

exports.getPayment = async (req, res)=>{
  const customer = req.session.customer;
    const cartItems = await cart.find({ customerID: customer._id });

    if(cartItems.length == 0){
      res.redirect("/customer/cart")
      return false;
    }
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
    
  res.render('customer/payment', { cart: req.session.cart, customer, itemsArray, cartItems });
}

exports.paymentSuccess = async (req, res) => {
  const { country, address, phone, moreInfo } = req.body;
  const customer = req.session.customer;

  if (!customer) {
    return res.redirect('/login'); // Ensure user is logged in
  }

  try {
    const cartItems = await cart.find({ customerID: customer._id });

    if (cartItems.length === 0) {
      return res.redirect("/customer/cart");
    }

    let itemsArray = [];

    // Loop through each item in the cart and fetch its details from the ShopItem collection
    for (const item of cartItems) {
      let shopItem = await ShopItem.findOne({ _id: item.itemID }).lean(); // Use lean() to get plain JS object
      if (shopItem) {
        shopItem.quantity = item.quantity;
        itemsArray.push(shopItem);
      }
    }

    let totalPrice = 0;
    itemsArray.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    // Create new order
    const newOrder = new order({
      customer: {
        customerId: customer._id,
        name: customer.name,
        email: customer.email,
        phone: phone
      },
      items: cartItems,
      shipping: {
        country: country,
        address: address
      },
      note: moreInfo,
      totalPaid: totalPrice
    });

    const orderSaved = await newOrder.save();

    if (orderSaved) {
      // Update item quantities in the ShopItem collection
      await Promise.all(cartItems.map(async (item) => {
        await ShopItem.findOneAndUpdate(
          { _id: item.itemID },
          { $inc: { availableCount: -item.quantity } } // Decrease the quantity by the amount in the cart
        );
      }));

      // Clear the cart
      await cart.deleteMany({ customerID: customer._id });
    }

    res.render('customer/success');
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Internal Server Error');
  }
};

