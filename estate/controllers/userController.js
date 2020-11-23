let { getUserByIdService, updateUserService } = require('../services/userService'); 
let { updateStatusService } = require('../services/modifiesOwnerService')
var jwt = require('jsonwebtoken');
let getUserDetailController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var data = jwt.verify(token, process.env.JWT_SECRET);
    var dataUser = await getUserByIdService(data._id);
    dataUser.password = undefined;
    if (dataUser) {
      //Nếu tồn tại user 
      return res.json({
        error: false,
        status: 200,
        message: "Thông tin tài khoản của bạn",
        dataUser: dataUser
      })
    } else {
      //Nếu không tồn tại user 
      return res.json({
        error: true,
        status: 400,
        message: "Bạn cần đăng nhập"
      })
    }
  } catch (error) {
    if (error) {
      console.log('Error getUserDetailController: ', error);
    }
    //Nếu không tồn tại user 
    return res.json({
      error: true,
      status: 400,
      message: "Error Server"
    })
  }
}

let updateUserController = async (req, res) => {
  try {
    var { idModify } = req.params;
    await updateStatusService(idModify, "active");
    var ownerModify = req.body;
    var userModify = await updateUserService(ownerModify.idOwner, ownerModify.name, ownerModify.phone, ownerModify.address, ownerModify.username);
      if (userModify.nModified > 0) {
      return res.json({
        error: false,
        status: 200,
        message: 'Cập nhật người dùng thành công'
      })
    } else {
      return res.json({
        error: true,
        status: 400,
        message: 'Người dùng không tồn tại và sửa không thành công'
      })
    }
  } catch (error) {
    if (error) {
      console.log('Error updateUserController: ', error);
    }
    //Nếu không tồn tại user 
    return res.json({
      error: true,
      status: 400,
      message: "Error Server"
    })
  }
}

module.exports = {
  getUserDetailController,
  updateUserController,
}