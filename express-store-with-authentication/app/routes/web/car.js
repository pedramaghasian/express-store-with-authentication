const express = require('express');
const router = express.Router();
const carController = require('app/http/controllers/carController');

router.get('/:id', carController.getCar);
router.post('/search', carController.postSearch);

module.exports = router;
