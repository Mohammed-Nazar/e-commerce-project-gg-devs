const isSuperAdmin = (req, res, next) => {
    if (req.session.admin && req.session.admin.isSuperAdmin) {
      return next();
    }
    return res.status(403).send('Access denied');
  };
  
;
  