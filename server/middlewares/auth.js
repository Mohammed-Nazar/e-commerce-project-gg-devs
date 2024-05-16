const { customer } = require('../models/customer');


const isAuthenticated = async (req, res, next) => {
    if (req.session.user) {
        next(); // user is authenticated
      } else {
        res.status(401).json({error: "Unauthenticated"})
      }
};



const isCustomer = (req, res, next) => {
   const isAdmin = req.session.user.isAdmin;
    
  if (isAdmin || req.session.user) {
    return next();
  }
  res.status(403).json({ error: "This action is unauthorized" });
};

const isAdmin = (req, res, next) => {
   const isAdmin = req.session.user.isAdmin;

  if (isAdmin) {
    return next();
  }
  res.status(403).json({ error: "This action is unauthorized" });
};


module.exports = {
  isAuthenticated,
  isAdmin,
  isCustomer,
};
