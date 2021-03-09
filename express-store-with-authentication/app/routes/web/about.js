const express = require('express');
const router = express.Router();
const aboutController = require('app/http/controllers/aboutController');

router.get('/', aboutController.getAbout);
module.exports = router;
