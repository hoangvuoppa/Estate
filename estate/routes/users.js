var express = require('express');
var router = express.Router();
var { getUserDetailController } = require('../controllers/userController');
/* GET users listing. */
router.get('/user-detail', getUserDetailController);

module.exports = router;
