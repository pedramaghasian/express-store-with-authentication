const Controller = require('../controller');
const fs = require('fs');
const path = require('path');
const Users = require('app/models/user.js');

class LogoutController extends Controller {
  getLogout(req, res) {
    req.session.destroy((err) => {
      return res.redirect('/auth/login');
    });
  }
}

module.exports = new LogoutController();
