const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/usersController');
const passport = require('passport');
const User = require('../models/user');

router.get('/', users_controller.index_get);
router.get('/login', users_controller.login_get);
router.get('/signup', users_controller.signup_get);
router.post('/login', users_controller.login_post);
router.all('/logout', users_controller.logout_post);

router.post('/signup', users_controller.signup_post);

module.exports = router;
