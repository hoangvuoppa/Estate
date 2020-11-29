var express = require('express');
var router = express.Router();
let {
  checkAuth,
  checkOwner
} = require('../middleware/index');
let {
  uploadImageLocalController,
  createPostController,
  postsOwnerController,
  detailPostController,
  updatePostController,
  deletePostController
} = require('../controllers/ownerController')
let upload = require('../controllers/multerController');
/* GET owners listing. */
router.use(checkAuth);
router.use(checkOwner);

router.get('/poster-room', (req, res, next) => {
  res.render('owners/posterRoom');
});
/* Post room owners input local. */
router.post('/post-room', createPostController);
//Get detail post
router.get('/detail-post/:idPost', detailPostController);
//Put post
router.put('/update-post-room/:idPost', updatePostController);
//Delete post
router.delete('/delete-post-room/:idPost', deletePostController);
/* Post images owners input local. */
router.post('/upload-image', upload.any(), uploadImageLocalController);
/* Get all posts owners input local. */
router.get('/owner-posts', postsOwnerController);
// router.put('/modify', updateUserController);

module.exports = router;
