var express = require('express');
var router = express.Router();
let { checkAuth, checkOwner } = require('../middleware/index');
let { checkAuthController } = require('../controllers/authController')
/* GET login page. */
router.get('/register', function (req, res, next) {
  res.render('login_register/register');
});
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login_register/login_register');
});
/* GET Home page. */
router.get('/', checkAuth, checkAuthController);
/* GET profile page. */
router.get('/profile', checkAuth, function (req, res, next) {
  res.render('profile', { title: 'Profile' });
});
/* GET modify page. */
router.get('/modify', checkAuth, checkOwner, function (req, res, next) {
  res.render('owners/modifyOwner', { title: 'Modify' });
});
/* GET waiting-approve page. */
router.get('/waiting-for-approval', checkAuth, checkOwner, function (req, res, next) {
  res.render('owners/wait-approve-info', { title: 'Waiting Approve' });
});
router.get('/table', checkAuth, checkOwner, function (req, res,) {
  res.render('owners/tableList', { title: 'Table List' });
})

module.exports = router;
