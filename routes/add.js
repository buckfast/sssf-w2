const express = require('express');
const router = express.Router();
const add_controller = require('../controllers/addController');

router.get('/', add_controller.index);
router.post('/', add_controller.upload.single("image"), add_controller.image_upload_post);

module.exports = router;
