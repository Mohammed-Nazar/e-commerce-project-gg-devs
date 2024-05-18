// const isAuthenticated = (req, res, next) => {
//   if (req.session) {
//     return next();
//   }
//   res.redirect('/signin');
// };

const isCustomer = (req, res, next) => {
  if (req.session && req.session.customer) {
    return next();
  }
  res.redirect('/signin');
};
const isAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/signin');
};

module.exports = {
  // isAuthenticated,
  isAdmin,
  isCustomer,
};
