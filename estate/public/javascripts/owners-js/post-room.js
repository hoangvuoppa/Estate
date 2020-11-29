$("button.submit-post").click(() => {
  var address_room = $('input[name="address_room"]').val();
  var near_places = $('input[name="near_places"]').val();
  var kind_room = $('select[name="kind_room"]').val();
  var number_room = $('input[name="number_room"]').val();
  var price = $('input[name="price"]').val();
  var area = $('input[name="area"]').val();
  var general_owner = $('select[name="general_owner"]').val();
  var bathroom = $('select[name="bathroom"]').val();
  var hot_cold_bottles = $('select[name="hot_cold_bottles"]').val();
  var kitchen = $('select[name="kitchen"]').val();
  var cooking = $('select[name="cooking"]').val();
  var conditioning = $('select[name="conditioning"]').val();
  var balcony = $('select[name="balcony"]').val();
  var electricity_price = $('input[name="electricity_price"]').val();
  var water_price = $('input[name="water_price"]').val();
  var other_utility = $('input[name="other_utility"]').val();
  var time_post = $('select[name="time_post"]').val();

  console.log(kind_room);
  $.ajax({
    url: '/owners/post-room',
    method: 'post',
    data: {
      address_room,
      kind_room,
      near_places,
      number_room,
      price,
      area,
      general_owner, bathroom,
      hot_cold_bottles, kitchen, cooking, conditioning,
      balcony,
      electricity_price,
      water_price,
      other_utility,
      time_post,
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/home';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
})

getInfoOwner();
function getInfoOwner() {
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var dataUser = result.dataUser;
      var template = ` 
      <h5 class="col-sm-6">Owner: <span>${dataUser.name}</span></h5>
      <h5 class="col-sm-6">Phone: <span>0${dataUser.phone}</span></h5>
      `;
      $("span.infoOwner").append(template);
    }
  }).catch((error) => {

  })
}

Dropzone.options.uploadWidget = {
  paramName: 'file',
  maxFilesize: 2, // MB
  maxFiles: 1,
  dictDefaultMessage: 'Kéo ảnh vào đây hoặc click để chọn file',
  headers: {
    'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
  },
  acceptedFiles: 'image/*',
  init: function () {
    this.on('success', function (file, resp) {
      console.log(file);
      console.log(resp);
    });
    this.on('thumbnail', function (file) {
      if (file.accepted !== false) {
        if (file.width < 640 || file.height < 480) {
          file.rejectDimensions();
        }
        else {
          file.acceptDimensions();
        }
      }
    });
  },
  accept: function (file, done) {
    file.acceptDimensions = done;
    file.rejectDimensions = function () {
      done('The image must be at least 640 x 480px')
    };
  }
};