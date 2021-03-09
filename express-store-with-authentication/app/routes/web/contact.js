const express = require('express');
const router = express.Router();
const contactController = require('app/http/controllers/contactController');

router.get('/', contactController.getContact);

module.exports = router;
