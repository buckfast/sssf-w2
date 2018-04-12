const express = require('express');
const router = express.Router();
const picsController = require("../controllers/picsController");
const users_controller = require("../controllers/usersController");


router.get('/', picsController.index_get);

router.get('/:id/update', users_controller.loggedInAs, picsController.update_get);
router.post('/:id/update', users_controller.loggedInAs, picsController.update_post);
router.delete('/:id/delete', users_controller.loggedInAs, picsController.delete_delete);

module.exports = router;
