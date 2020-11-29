
getData();
function getData() {
  $.ajax({
    method: "GET",
    url: '/owners/owner-posts'
  }).then((result) => {
    var { dataPost } = result;
    $("tbody.infoPost").empty();
    var template;
    dataPost.forEach((element) => {
      if (element.status === 'pending') {
        // Waiting for approval 
        template = ` 
                <tr>
                  <td>${element.address_room}</td>
                  <td>${element.kind_room}</td>
                  <td>${new Date(element.createdAt).toLocaleString()}</td>
                  <td>${new Date(element.updatedAt).toLocaleString()}</td>
                  <td>${element.status}</td>  
                  <td class='buttonHandle'>
                    <button onClick = handleEditPost.call(this)  data-id = ${element._id}  type="button" class="btn btn-warning "data-toggle="modal" data-target="#btn-edit">
                      <i class="far fa-edit"></i>
                    </button>  
                    <button  onClick = handleDeletePost.call(this)  data-id = ${element._id}  type="button" class="btn btn-danger btn-delete">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                <tr> 
        `;
      } else if (element.status === 'active' || element.status === 'cancel') {
        template = `
                <tr>
                  <td>${element.address_room}</td>
                  <td>${element.kind_room}</td>
                  <td>${new Date(element.createdAt).toLocaleString()}</td>
                  <td>${new Date(element.updatedAt).toLocaleString()}</td>
                  <td>${element.status}</td>  
                <tr>
          `;
      }
      $("tbody.infoPost").append(template);
    })
  }).catch((error) => {
    console.log(error);
  })
}
function handleEditPost() {
  // cho vao model:  .content-update
  var idPost = $(this).attr("data-id");
  $.ajax({
    ///detail-post/:idPost
    method: 'GET',
    url: "/owners/detail-post/" + idPost
  }).then((result) => {
    var { dataPost } = result;
    $('.content-update').empty();
    template = `
      
<style>
  * {
    margin: 0;
    padding: 0
  }

  .images-detail .image-room {
    width: 20%;

  }

  label.hot-cold-bottles {
    display: block;
    margin-bottom: 12px;
  }

  label.general-owner {
    float: left;
  }


  label.general-owner+input {
    margin-left: 180px;
  }

  input#general-owner+span {
    width: 100px;
    display: inline-block;
  }

  input,
  select {
    width: 75% !important;
    margin: auto;
  }
</style>
 
<div>
  <div class="form-group">
    <label for="address_room ">Address Room *</label>
    <input value='${dataPost.address_room}' type="text" class="form-control" name="address_room" id="address_room ">
    <small id="error-address_room" class="form-text text-muted"></small>
  </div>
  <div class="form-group">
    <label for="near_places ">Near any public places</label>

    <input value='${dataPost.near_places}' type="text" class="form-control" name="near_places" id="near_places"
      aria-describedby="helpId" placeholder="Enter Near any public places">

    <small id="error-near_places" class="form-text text-muted"></small>

  </div>
  <div class="form-group">
    <label for="kind_room">Kind of Room</label>
    <select class="form-control" name="kind_room" id="kind_room">
      <option value='${dataPost.kind_room}' hidden>${dataPost.kind_room}</option>
      <option value='Motel Room'>Motel Room</option>
      <option value='Mini apartment'>Mini apartment</option>
      <option value='Whole house'>Whole house</option>
    </select>
  </div>
  <div class="form-group">
    <label for="number_room">Number of Room</label>
    <input value='${dataPost.number_room}' type="number" class="form-control" name="number_room" id="c"
      aria-describedby="helpId" placeholder="Enter Number of Room">
    <small id="error-number_room" class="form-text text-muted"></small>
  </div>

  <div class="form-group">
    <label for="price">Prices</label>
    <input value='${dataPost.price}' type="text" class="form-control" name="price" id="price" aria-describedby="helpId"
      placeholder="Enter Near any public price month/quarter/year">
    <small id="error-price" class="form-text text-muted"></small>
  </div>


  <div class="form-group">
    <label for="area">Area</label>
    <input value='${dataPost.area}' type="number" class="form-control" name="area" id="area" aria-describedby="helpId"
      placeholder="Enter Area">
    <small id="error-area" class="form-text text-muted"></small>
  </div>
  <div class="form-group">
    <label for="general_owner">General owner</label>
    <select class="form-control" name="general_owner" id="general_owner">
      <option value= '${dataPost.general_owner}' hidden>${dataPost.general_owner}</option>
      <option value= 'Yes' >Yes</option>
      <option value= 'No' >No</option>
    </select>
  </div>
  <div class="form-group">
    <div class="row">
      <h2 class="col-sm-12">Physical facilities</h2>
      <div class="col-sm-6">
        <label for="bathroom">Bathroom *</label>
        <select class="form-control" name="bathroom" id="bathroom">
          <option value= '${dataPost.bathroom}' hidden>${dataPost.bathroom}</option>

          <option value= 'Closed'>Closed</option>
          <option value= 'General'>General</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="hot_cold_bottles">Hot and cold bottles *</label>
        <select class="form-control" name="hot_cold_bottles" id="hot_cold_bottles">
          <option value= '${dataPost.hot_cold_bottles}' hidden>${dataPost.hot_cold_bottles}</option>
          <option value= 'Yes'>Yes</option>
          <option value= 'No'>No</option>
        </select>
      </div>
      <div class="col-sm-6">
        <label for="kitchen">Kitchen Room</label>
        <select class="form-control" name="kitchen" id="kitchen">
          <option value= '${dataPost.kitchen}' hidden>${dataPost.kitchen}</option>
          <option value= 'Closed'>Closed</option>
          <option value= 'General'>General</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="cooking">Cooking</label>
        <select class="form-control" name="cooking" id="cooking">
          <option value= '${dataPost.cooking}' hidden>${dataPost.cooking}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="conditioning">Air Conditioning</label>
        <select class="form-control" name="conditioning" id="conditioning">
          <option value= '${dataPost.conditioning}' hidden>${dataPost.conditioning}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="balcony">Balcony</label>
        <select class="form-control" name="balcony" id="balcony">
          <option value= '${dataPost.balcony}' hidden>${dataPost.balcony}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-6">
            <label for="electricity_price">Electricity Price</label>
            <input value='${dataPost.electricity_price}' type="number" class="form-control" name="electricity_price"
              id="electricity_price " aria-describedby="helpId" placeholder="Electricity Price ">
            <small id="error-electricity_price" class="form-text text-muted"></small>
          </div>
          <div class="col-sm-6">
            <label for="water_price">Water Price</label>
            <input value='${dataPost.water_price}' type="number" class="form-control" name="water_price"
              id="water_price " aria-describedby="helpId" placeholder="Electricity Price ">
            <small id="error-water_price" class="form-text text-muted"></small>
          </div>
        </div>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="other_utility">Other Utility</label>
        <input value='${dataPost.other_utility}' type="text" class="form-control" name="other_utility"
          id="other_utility " aria-describedby="helpId"
          placeholder="Refrigerator / Washing machine / Bed cabinet etc...">
        <small id="error-other_utility" class="form-text text-muted"></small>
      </div><!-- ennd col-6 -->
    </div>
  </div> 
  <div class="form-group">
    <label for="time_post">Time the post shows up</label>
    <select class="form-control" name="time_post" id="time_post">
      <option value= '${dataPost.time_post}' hidden>${dataPost.time_post}</option>
      <option value= 'Week' >Week</option>
      <option value= 'Month'>Month </option>
      <option value= 'Quarter'>Quarter</option>
      <option value= 'Year'>Year</option>
    </select>
  </div>
</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button onClick=handleSavePost.call(this) data-id = "${dataPost._id}" data-images =  ${dataPost.images_room}  type="button" class="btn btn-primary">Save changes</button>
        </div>
`;
    $('.content-update').append(template);
  }).catch((error) => {

  })
}
function handleSavePost() {
  var idPost = $(this).attr('data-id');

  var images_room = $(this).attr('data-images');

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

  console.log(idPost);
  $.ajax({
    method: 'put',
    url: '/owners/update-post-room/' + idPost,
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
      images_room
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/table';
    } else {
      alert(result.message);
    }
  }).catch((error) => {

  })
}
function handleDeletePost() {
  var idPost = $(this).attr("data-id");
  $.ajax({
    method: 'delete',
    url: "/owners/delete-post-room/" + idPost
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().parent().empty();
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}