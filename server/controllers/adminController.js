const Admin = require('../models/Admin');
const { getItems } = require('./itemControllers');
const allCustomers = require('./../models/customer')
const order = require('../models/order')

// const bcrypt = require('bcrypt');

// Render Dashboard Page , crud 4 items later 
exports.getDashboard = async (req, res) => {
 let items = await getItems();
  res.render('admin/dashboard', { items: items, adminEmail: req.session.admin.email , messageItem: req.session.itemMsg || ""});
};

// Render New Admin Page for creating a new admin
exports.getNewAdmin = (req, res) => {
  if (req.session.admin.isSuperAdmin) {
    res.render('admin/new_admin', { adminEmail: req.session.admin.email });
  } else {
    res.status(403).send('Access denied');
  }
};

// Handling New Admin Creation
exports.postNewAdmin = async (req, res) => {
  if (!req.session.admin.isSuperAdmin) {
    return res.status(403).send('Access denied');
  }

  const { email, password } = req.body;

  try {
    const admin = new Admin({ email, password });
    await admin.save();
    res.render('admin/new_admin', { successMessage: 'New admin created successfully.', adminEmail: req.session.admin.email });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Render Orders Page will work later after the customer functions r done
exports.getOrders = async (req, res) => {
  const orders = await order.find({})
  res.render('admin/orders', { adminEmail: req.session.admin.email, orders });
};

// Render Customers Page , after building the customers , will fetch em from db in this view 
exports.getCustomers = async (req, res) => {
  const customer = req.session.customer;
  const customers = await allCustomers.find({});
  res.render('admin/customers', { adminEmail: req.session.admin.email,  customer, customers});
};

