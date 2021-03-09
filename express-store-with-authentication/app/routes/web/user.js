const express = require('express');
const router = express.Router();
const userController = require('../../http/controllers/user/userController');

router.get('/:username', userController.getUser);
router.post('/edit', userController.postEdit);
module.exports = router;
