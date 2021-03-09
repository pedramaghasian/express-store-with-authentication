exports.isauth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash('errors', 'لطفا ابتدا وارد سایت شوید ');
    return res.redirect('/auth/login');
  }
  next();
};
