const Admin = require('../models/Admin');
const Customer = require('../models/customer');

// Render Signin Page
exports.getSignIn = (req, res) => {
  res.render('signin');
};

// Signin logic, need 2 work on validation later 
exports.postSignIn = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const admin = await Admin.findOne({ email });
    const customer = await Customer.findOne({ email });
    if (admin) {
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).render('signin', { errorMessage: 'Invalid email or password.' });
      }
      req.session.admin = admin;
      res.redirect('/admin/dashboard');
    } else if (customer) {
      const isMatch = await customer.comparePassword(password);
      if (!isMatch) {
        return res.status(400).render('signin', { errorMessage: 'Invalid email or password.' });
      }
      req.session.customer = customer;
      req.session.customer_id = customer.id;
      console.log(req.session.customer_id)
      res.redirect('/customer/home');
    } else {
      return res.status(400).render('signin', { errorMessage: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getRegisterCustomer = (req, res) => {
  res.render('register');
};

exports.postRegisterCustomer = async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;
  
  try {
    const customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).render('register', { errorMessage: 'Email already exists.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).render('register', { errorMessage: 'Password confirmation does not match.' });
    }
    email = email.toLowerCase();
    const newCustomer = await Customer.create({ name, email, password });
    return res.status(201).render('signin');
  } catch (error) {
    return res.status(400).render('register', { errorMessage: error.message });
  }
};

// Handling Signout
exports.getSignOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/signin');
  });
};

