const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/usersController');

router.get('/', users_controller.index_get);


module.exports = router;
