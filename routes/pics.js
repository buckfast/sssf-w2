const express = require('express');
const router = express.Router();
const picsController = require("../controllers/picsController");

router.get('/', picsController.index_get);

module.exports = router;
