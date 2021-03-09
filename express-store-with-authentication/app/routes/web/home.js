const express = require('express');
const router = express.Router();
const homeController = require('app/http/controllers/homeController');

router.get('/', homeController.getHome);
module.exports = router;
