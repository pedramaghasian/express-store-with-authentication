const express = require('express');
const router = express.Router();
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const logoutController = require('app/http/controllers/auth/logoutController');

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/register', registerController.getRegister);
router.post(
  '/register',
  registerController.checkInputs,
  registerController.postRegister
);

router.get('/logout', logoutController.getLogout);

module.exports = router;
