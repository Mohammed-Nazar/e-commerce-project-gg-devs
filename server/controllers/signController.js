const Admin = require('../models/Admin');
const Customer = require('../models/Customer');

// Render Signin Page
exports.getSignIn = (req, res) => {
  res.render('signin');
};

// Signin logic, need 2 work on validtion later 
exports.postSignIn = async (req, res) => {
  const { email, password } = req.body;

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
        
    } else if (customer){
        const isMatch = await customer.comparePassword(password);
        if (!isMatch) {
            return res.status(400).render('signin', { errorMessage: 'Invalid email or password.' });
        }
        req.session.customer = customer;
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
  const { name, email, password, confirmPassword } = req.body;
  
  try {
    const customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).render('register', { errorMessage: 'Email already exists.' });
      }
      if (password !== confirmPassword) {
        return res.status(400).render('register', { errorMessage: 'Password confirmation does not match.' });
      }
      
      const newCustomer = await Customer.create({ name, email, password });
    return res.status(201).render('signin');
    
  } catch (error) {
    return res.status(400).render('register', { errorMessage: error.message });
  }
};

// Handlin Signout
exports.getSignOut = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.redirect('/signin');
    });
  };
