var express = require('express');
var router = express.Router();
let { checkAuth, checkOwner } = require('../middleware/index');
let { uploadImageLocalController, createPostController, postsOwnerController } = require('../controllers/ownerController')
let upload = require('../controllers/multerController');
/* GET owners listing. */
router.use(checkAuth);
router.use(checkOwner);

router.get('/poster-room', (req, res, next) => {
  res.render('owners/posterRoom');
}); 

router.get('/update-post-room', (req, res, next) => {
  res.render('owners/updatePostRoom');
});
/* Post images owners input local. */
router.post('/upload-image', upload.any(), uploadImageLocalController);
/* Post room owners input local. */
router.post('/post-room', createPostController);
/* Get all posts owners input local. */
router.get('/owner-posts', postsOwnerController);
// router.put('/modify', updateUserController);

module.exports = router;
