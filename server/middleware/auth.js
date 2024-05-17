const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/admin/signin');
};

module.exports = isAuthenticated;
