var {
  createPostRoomService,
  postsOwnerService,
  allPostService,
  updatePostService,
  findPostService
} = require('../services/posterRoomService');
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
var { Verify } = require('../utils/JWT');
const images = new Array();
let uploadImageLocalController = async (req, res) => {
  images.push(req.files[0].path);
  res.send(req.files);
}

let createPostController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var dataUser = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataUser._id;
    var object = req.body;
    object.images_room = images;
    object.idOwner = idOwner;
    var post_room = await createPostRoomService(object);
    console.log(post_room);
    images.length = 0;
    if (post_room) {
      caseSuccess(res, "Bạn đã tạo bài đăng thành công")
    } else {
      caseErrorUser(res, "Bạn đã tạo bài đăng thất bại");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
let postsOwnerController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var dataUser = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataUser._id;
    var dataPost = await postsOwnerService(idOwner);
    if (dataPost) {
      res.json({
        status: 200,
        dataPost: dataPost,
        error: false,
        message: "Thông tin những bài đăng của bạn"
      })
    } else {
      caseErrorUser(res, "Không có thông tin của bài đăng nào");
    }
    console.log(dataPost);
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
let findPostController = async (req, res) => {
  
  var post = await findPostService()
}

let allPostsController = async (req, res) => {
  try {
    var dataPost = await allPostService();
    if (dataPost) {
      res.json({
        status: 200,
        dataPost: dataPost,
        error: false,
        message: "Thông tin tất cả những bài đăng của bạn"
      })
    } else {
      caseErrorUser(res, "Không có thông tin của bài đăng nào");
    }
  } catch (error) {

  }
}

module.exports = {
  uploadImageLocalController,
  createPostController,
  postsOwnerController
}