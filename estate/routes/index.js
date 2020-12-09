var express = require('express');
var router = express.Router();
let { checkAuth, checkOwner, checkAdmin, checkOwner_Admin } = require('../middleware/index');
let { checkAuthController } = require('../controllers/authController')

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login_register/login_register');
});
/* GET Home page. */
router.get('/', checkAuth, checkAuthController);
/* GET profile page. */
router.get('/profile-owner', checkAuth, function (req, res, next) {
  res.render('owners/profile-owner', { title: 'Profile' });
});
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
router.get('/chat-room', checkAuth, checkOwner_Admin, function (req, res,) {
  res.render('owners/chat-room', { title: 'Table List' });
})
router.get('/credits', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/credits', { title: 'Express' });
});
router.get('/datatables', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/datatables', { title: 'Express' });
});
router.get('/mail-box', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/mail-box', { title: 'Express' });
});
router.get('/request-owners', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/request-modify-owner', { title: 'Express' });
});
router.get('/admin-chat-room', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/credits-copy', { title: 'Express' });
});
module.exports = router;
