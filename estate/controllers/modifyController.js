var jwt = require('jsonwebtoken');
let {
  infoUserModifyService,
  getOwnerService,
  deleteOwnerService,
  updateStatusService
} = require('../services/modifiesOwnerService');
let createModifyController = async (req, res) => {
  var token = req.cookies.token || req.body.token;
  var dataOwner = jwt.verify(token, process.env.JWT_SECRET);
  var idOwner = dataOwner._id;
  var infoUser = req.body;
  var owner = await infoUserModifyService(idOwner, infoUser);
  if (owner) { 
    return res.json({
      error: false,
      status: 200,
      message: "Tạo thông tin sửa tài khoản thành công"
    })
  } else {
    return res.json({
      error: true,
      status: 400,
      message: "Tạo thông tin sửa tài khoản không thành công" 
    })
  }
}
let getOwnerController = async (req, res) => {
  try {
    var dataOwner = await getOwnerService(); 
    if (dataOwner) {
      //Nếu tồn tại user 
      return res.json({
        error: false,
        status: 200,
        message: "Thông tin tài khoản owner cần chỉnh sửa",
        dataOwner: dataOwner
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

let cancelOwnerController = async (req, res) => {
  var { idModify } = req.params;
  var cancelStatus = await updateStatusService(idModify, "cancel");
  if (cancelStatus) {
    res.json({ 
      status:200,
      error:false,
      message:"Bạn đã hủy thành công"
    })
  }else{
    res.json({ 
      status:400,
      error:true,
      message:"Bạn đã hủy không thành công"
    })
  }
}

let deleteOwnerController = async (req, res) => {
  var { idModify } = req.params;
  var deleOwner = await deleteOwnerService(idModify);
  if (deleOwner) {
    return res.json({
      status: 200,
      error: false,
      message: "Trở về home thành công"
    })
  } else {

    return res.json({
      status: 400,
      error: true,
      message: "Trở về home thất bại"
    })
  }
}
module.exports = {
  createModifyController,
  getOwnerController,
  deleteOwnerController,
  cancelOwnerController
}