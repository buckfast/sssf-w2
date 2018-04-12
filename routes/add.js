const express = require('express');
const router = express.Router();
const add_controller = require('../controllers/addController');
const users_controller = require("../controllers/usersController");

router.get('/',  users_controller.loggedIn, add_controller.index);
router.post('/', users_controller.loggedIn, add_controller.upload.single("image"), add_controller.image_upload_post);

module.exports = router;
