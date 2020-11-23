var express = require('express');
var router = express.Router();
let { checkAuth, checkOwner } = require('../middleware/index');
let { checkAuthController } = require('../controllers/authController')
/* GET login page. */
router.get('/register', function (req, res, next) {
  res.render('register');
});
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
/* GET home page. */
router.get('/home', checkAuth, checkAuthController);
/* GET home page. */
router.get('/', checkAuth, function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/profile', checkAuth, function (req, res, next) {
  res.render('profile', { title: 'Express' });
});
/* GET home page. */
router.get('/modify', checkAuth, checkOwner, function (req, res, next) {
  res.render('modifyOwner', { title: 'Modify' });
});
/* GET home page. */
router.get('/waiting-for-approval', checkAuth, checkOwner, function (req, res, next) {
  res.render('wait-approve', { title: 'Waiting Approve' });
});
module.exports = router;
