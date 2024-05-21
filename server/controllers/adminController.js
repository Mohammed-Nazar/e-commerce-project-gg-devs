const Admin = require('../models/Admin');
const { getItems } = require('./itemControllers');
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
exports.getOrders = (req, res) => {
  res.render('admin/orders', { adminEmail: req.session.admin.email });
};

// Render Customers Page , after building the customers , will fetch em from db in this view 
exports.getCustomers = (req, res) => {
  res.render('admin/customers', { adminEmail: req.session.admin.email });
};

