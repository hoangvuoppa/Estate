const mongoose = require('mongoose');

const posterRoomSchema = mongoose.Schema({

  address_room: {//ok
    type: String,
    required: true
  },
  near_places: {//ok
    type: String
  },
  kind_room: {//ok
    type: String
  },
  number_room: {
    type: Number,//ok
  },
  price: {
    type: String//ok
  },
  area: {
    type: Number,//ok
  },
  general_owner: {
    type: String
  },
  bathroom: {
    type: String,
    require: true
  },
  hot_cold_bottles: {
    type: String,
    require: true
  },
  kitchen: {
    type: String,
    require: true
  },
  cooking: {
    type: String,
    require: true
  },
  conditioning: {
    type: String,
    require: true
  },
  balcony: {
    type: String,
    require: true
  },
  electricity_price: {
    type: Number,
    require: true
  },
  water_price: {
    type: Number,
    require: true
  },
  other_utility: {
    type: String,
    require: true
  },
  idOwner: { type: String, ref: "users" },
  images_room: Array,
  status: {
    type: String,
    default: 'pending',
    require: true
  },
  time_post: {
    type: String,
    require: true
  },
  rent_status: {
    type: String,
    require: true,
    default: 'Not yet hired'
  }
}, {
  collection: 'poster_room',
  timestamps: true
});

const posterRoomModel = mongoose.model('Poster Room', posterRoomSchema);
module.exports = posterRoomModel;