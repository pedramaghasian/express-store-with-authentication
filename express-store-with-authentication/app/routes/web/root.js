const express = require('express');
const router = express.Router();
const rootController = require('app/http/controllers/rootController');

router.get('/', rootController.getRoot);
module.exports = router;
