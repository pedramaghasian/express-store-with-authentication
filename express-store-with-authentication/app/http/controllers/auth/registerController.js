const Controller = require('../controller');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Users = require('app/models/user.js');

class RegisterController extends Controller {
  getRegister(req, res) {
    res.render('auth/register', { messages: req.flash() });
  }

  postRegister(req, res, next) {
    this.validationData(req, res);
  }

  validationData(req, res) {
    const errors = validationResult(req);
    let messages = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        messages.push(err.msg);
      });
      req.flash('errors', messages);
      return res.redirect('/auth/register');
    }
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          req.flash('errors', 'کاربری با این نام کاربری موجود می باشد');
          return res.redirect('/auth/register');
        }
        Users.findOne({ email: req.body.email })
          .then((userByEmail) => {
            if (userByEmail) {
              req.flash('errors', 'کاربری با این نام کاربری موجود می باشد');
              return res.redirect('/auth/register');
            }
            const newUser = new Users({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
              gender: req.body.gender === 'جنسیت' ? 'male' : req.body.gender,
            });
            newUser.save().then(() => {
              req.flash('success', 'ثبت نام شما با موفقی انجام شد');
              res.redirect('/auth/login');
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  checkInputs = [
    check('username', 'فیلد نام کاربری نمی تواند خالی بماند').notEmpty(),
    check(
      'username',
      'فیلد نام کاربری نمیتواند کمتر از 5 کاراکتر باشد'
    ).isLength({
      min: 5,
    }),
    check('email', 'فیلد ایمیل نمیتواند خالی باشد').notEmpty(),
    check('email', 'فیلد ایمیل معتبر نیست').isEmail(),
    check('password', 'فیلد پسورد نمیتواند خالی باشد').notEmpty(),
    check('password', 'فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد').isLength({
      min: 8,
    }),
  ];
}

module.exports = new RegisterController();
