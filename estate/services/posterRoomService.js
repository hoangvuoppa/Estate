let PostRoom = require('../models/post_room.model');
let User = require('../models/user.model');

let createPostRoomService = (infoPost) => {
  return PostRoom.create(infoPost)
}
let postsOwnerService = (idOwner) => {
  return PostRoom.find({ idOwner });
}
let findPostService = (idPost) => {
  return PostRoom.findOne({ _id: idPost });
}
let updatePostService = (idPost, object) => {
  return PostRoom.updateOne({ _id: idPost }, object);
}
let deletePostService = (idPost) => {
  return PostRoom.deleteOne({ _id: idPost });
}
let allPostService = () => {
  return PostRoom.find().populate("idOwner");
} 
module.exports = {
  createPostRoomService,
  postsOwnerService,
  allPostService,
  updatePostService,
  findPostService,
  deletePostService, 
}