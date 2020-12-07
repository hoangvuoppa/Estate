var express = require('express');
var router = express.Router();
var { createNotifyController, displayNotifyController, deleteNotifyOwnerController } = require('../controllers/notifyController');
var { checkAuth, checkOwner, checkAdmin } = require('../middleware/index')
/* GET users listing. */
router.use(checkAuth);
router.post('/create-notify', checkAdmin, createNotifyController);
router.get('/owner-notifies', checkOwner, displayNotifyController);
router.delete('/notify-delete/:idNotify', checkOwner, deleteNotifyOwnerController);
// router.put('/modify', updateUserController);

module.exports = router;
