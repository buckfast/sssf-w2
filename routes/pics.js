const express = require('express');
const router = express.Router();
const picsController = require("../controllers/picsController");


router.get('/', picsController.index_get);

router.get('/:id/update', picsController.update_get);
router.post('/:id/update', picsController.update_post);
router.delete('/:id/delete', picsController.delete_delete);

module.exports = router;
