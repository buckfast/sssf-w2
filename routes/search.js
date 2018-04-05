const express = require('express');
const router = express.Router();
const search_controller = require('../controllers/searchController');

router.get('/', search_controller.index_get);

module.exports = router;
