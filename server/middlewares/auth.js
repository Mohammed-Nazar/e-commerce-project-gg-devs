const { customer } = require('../models/customer');


const isAuthenticated = async (req, res, next) => {
    if (req.session.user) {
        next(); // user is authenticated
      } else {
        res.status(401).json({error: "Unauthenticated"})
      }
};



const isCustomer = (req, res, next) => {
   const role = req.session.user.role;
  if (role === 'customer' || role === 'admin') {
    return next();
  }
  res.status(403).json({ error: "This action is unauthorized" });
};

const isAdmin = (req, res, next) => {
   const role = req.session.user.role;

  if (role === 'admin') {
    return next();
  }
  res.status(403).json({ error: "This action is unauthorized" });
};


module.exports = {
  isAuthenticated,
  isAdmin,
  isCustomer,
};