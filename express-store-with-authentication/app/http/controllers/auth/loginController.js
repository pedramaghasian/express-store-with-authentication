const Controller = require('../controller');
const fs = require('fs');
const path = require('path');
const Users = require('app/models/user.js');

class LoginController extends Controller {
  getLogin(req, res) {
    req.session.isLoggedIn = false;
    res.render('auth/login', { messages: req.flash() });
  }

  postLogin(req, res) {
    this.validationData(req, res);
  }
  validationData(req, res) {
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          req.flash(
            'errors',
            'چنین نام کاربری وجود ندارد لطفا ابتدا ثبت نام کنید'
          );
          return res.redirect('/auth/login');
        }
        if (user.password === req.body.password) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            req.flash('success', 'شما با موفقیت وارد شدید');
            res.redirect('/home');
          });
        }
        req.flash('errors', 'کلمه عبور شما اشتباه است');
        return res.redirect('/auth/login');
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new LoginController();
