let { getUserByIdService } = require('../services/userService');
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
module.exports = {
  getUserDetailController
}