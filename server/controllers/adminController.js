const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// Render Signin Page
exports.getSignIn = (req, res) => {
  res.render('admin/signin');
};

// Signin logic,, need 2 work on validtion later 
exports.postSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).render('admin/signin', { errorMessage: 'Invalid email or password.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).render('admin/signin', { errorMessage: 'Invalid email or password.' });
    }

    req.session.admin = admin;
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Render Dashboard Page , crud 4 items later 
exports.getDashboard = (req, res) => {
  res.render('admin/dashboard', { items: [], adminEmail: req.session.admin.email });
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

// Handlin Signout
exports.getSignOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/admin/signin');
  });
};

