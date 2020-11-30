getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/admin/owner-verify'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var { dataOwner } = result;
      dataOwner.forEach((element) => {
        var template = ` 
          <tr>
            <td class ='name' >${element.name}</td>
            <td  class ='address'>${element.address}</td>
            <td  class ='phone'>${element.phone}</td> 
            <td  class ='username'>${element.username}</td>
            <td >${element.status}</td>
            <td>
              <button onClick = handleAccepted.call(this) data-id = ${element._id} data-owner =${element.idOwner}  class="accepted btn-primary ">Accept</button>
              <button onClick = handleCancel.call(this)  class="cancel btn-danger"   data-id = ${element._id} data-owner =${element.idOwner}>Cancel</button>
            </td>
          </tr> 
                `
        $("#detailOwners").append(template);
      })
    }

  }).catch((error) => {

  })

}
function handleAccepted() {
  var idModify = $(this).attr("data-id");
  var idOwner = $(this).attr("data-owner");
  var name = $(this).parent().parent().children("td.name").text();
  var address = $(this).parent().parent().children("td.address").text();
  var phone = $(this).parent().parent().children("td.phone").text();
  var username = $(this).parent().parent().children("td.username").text();
  $.ajax({
    url: '/admin/accept-owner/' + idModify,
    type: 'put',
    data: {
      idOwner, name, address, phone, username
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().empty();
    }
  }).catch((error) => {

  })

}
function handleCancel() {
  var idModify = $(this).attr("data-id");
  $.ajax({
    url: '/admin/cancel-owner/' + idModify,
    type: 'put',
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().parent('tr').empty();
    }
  }).catch((error) => {

  })
}

$("span.signOutIcon").click(() => {
  Cookies.remove("token");
  window.location.href = '/login';
})

$(".save_new_room").click(() => {
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
  var status = 'active';

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
      status
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
})

getAllPosts();
function compare(a, b) {
  if (a.idOwner.name < b.idOwner.name) {
    return -1;
  }
  if (a.idOwner.name > b.idOwner.name) {
    return 1;
  }
  return 0;
}

function getAllPosts() {
  $.ajax({
    url: '/owners/all-posts-rent',
    method: 'GET',
  }).then((result) => {
    var { dataPost } = result;
    if (!result.error && result.status === 200) {
      var template, rentStatus = '';
      $(".content-all-posts").empty();
      dataPost.sort(compare);
      dataPost.forEach((post) => {
        if (post.status === 'pending') {
          template = `
          <tr>
            <th>${post.idOwner.name}</th>
            <td>${post.idOwner.role}</td>
            <td>${new Date(post.createdAt).toLocaleString()}</td>
            <td>${post.status}</td> 
            <td></td>
            <td></td>
            <td>
              <span class="edit" onClick = handleEditAccept.call(this) data-id='${post._id}' class="btn btn-primary" data-toggle="modal" data-target="#edit-accept">
                <i class=" fas fa-edit"></i>
              </span>
              <span  class="cancel"  onClick = handleCancelPost.call(this) data-id='${post._id}'><i class="fas fa-minus-circle"></i></span>
            </td>
          </tr> 
          `;

        }
        else if (post.status === 'active') {
          if (post.idOwner.role === 'owner') {
            template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleString()}</td>
              <td>${post.status}</td> 
              <td>${post.rent_status}</td>  
              <td></td> 
              <td></td>  
            </tr> 
            `;
          }

          if (post.rent_status === 'Hired' && post.idOwner.role === 'admin') {
            template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleString()}</td>
              <td>${post.status}</td> 
              <td>${post.rent_status}</td>  
              <td></td> 
              <td></td>  
            </tr> 
            `;
          }
          if (post.rent_status === 'Not yet hired' && post.idOwner.role === 'admin') {
            template = `
            <tr>
              <th>${post.idOwner.name}</th>
              <td>${post.idOwner.role}</td>
              <td>${new Date(post.createdAt).toLocaleString()}</td>
              <td>${post.status}</td> 
              <td>${post.rent_status}</td>  
              <td></td> 
              <td></td> 
              <td class="button-hired" >
                <button onClick=handleHiredAdmin.call(this) style="font-size:13px;padding: 7px; " data-id = ${post._id}  type="button" class="btn btn-primary btn-hired">
                   <i style="  margin-right: 5px;" class="fas fa-check"></i>Hired
                </button>
              </td> 
            </tr> 
            `;
          }
        }
        else {
          template = `
          <tr>
            <th>${post.idOwner.name}</th>
            <td>${post.idOwner.role}</td>
            <td>${new Date(post.createdAt).toLocaleString()}</td>
            <td>${post.status}</td>  
            <td></td>  
            <td>
             <span onClick=handleRestorePost.call(this)  data-id='${post._id}' class="restore ml-4"><i class="fas fa-trash-restore"></i></span> 
            </td> 
          </tr>  
          `;
        }
        $(".content-all-posts").append(template);
        $(".button-hired").append(rentStatus);

      });

    }
  }).catch((error) => {
    console.log(error);
  })
}

function handleEditAccept() {
  var idPost = $(this).attr("data-id");
  $.ajax({
    ///detail-post/:idPost
    method: 'GET',
    url: "/owners/detail-post/" + idPost
  }).then((result) => {
    var { dataPost } = result;

    $('.content-edit-accept').empty();
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
 
<div class='row'>
  <div class="form-group  col-6">
    <label for="address_room ">Address Room *</label>
    <p>${dataPost.address_room}</p>
  </div>
  <div class="form-group  col-6 ">
    <label for="near_places ">Near any public places</label>
    <p>${dataPost.near_places}</p>

  </div>
  <div class="form-group   col-6 ">
    <label for="kind_room">Kind of Room</label>
    <p>${dataPost.kind_room}</p> 
  </div>
  <div class="form-group  col-6 ">
    <label for="number_room">Number of Room</label>
    <p>${dataPost.number_room}</p> 
  </div>

  <div class="form-group   col-6 ">
    <label for="price">Prices</label>
    <p>${dataPost.price}</p> 
 
  </div>


  <div class="form-group  col-6 ">
    <label for="area">Area</label>
    <p>${dataPost.area}</p>  
  </div>
  <div class="form-group  col-6 ">
    <label for="general_owner">General owner</label>    
    <p>${dataPost.general_owner}</p>   
    </select>
  </div>
  
  <div class="form-group  col-6  ">
    <label for="time_post">Time the post shows up</label>
    <p>${dataPost.time_post}</p>        
  </div>
  <div class="form-group  ">
    <div class="row">
      <h2 class="col-sm-12">Physical facilities</h2>
      <div class="col-sm-6">
        <label for="bathroom">Bathroom *</label>
          <p>${dataPost.bathroom}</p>    
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="hot_cold_bottles">Hot and cold bottles *</label>
        <p>${dataPost.hot_cold_bottles}</p>     
      </div>
      <div class="col-sm-6">
        <label for="kitchen">Kitchen Room</label>
        <p>${dataPost.kitchen}</p>      
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="cooking">Cooking</label>
        <p>${dataPost.cooking}</p>       
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="conditioning">Air Conditioning</label>
        <p>${dataPost.conditioning}</p>       
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="balcony">Balcony</label>   
        <p>${dataPost.conditioning}</p>       

      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-6">
            <label for="electricity_price">Electricity Price</label>
            <p>${dataPost.electricity_price}</p>        
          </div>
          <div class="col-sm-6">
            <label for="water_price">Water Price</label>
            <p>${dataPost.water_price}</p>         
          </div>
        </div>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="other_utility">Other Utility</label>
        <p>${dataPost.other_utility}</p>        
      </div><!-- ennd col-6 -->
    </div>
  </div> 
  <div class="form-group   images-detail">

  </div>
</div> 
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button onClick = handleAcceptedPost.call(this) data-id = '${dataPost._id} ' type="button" class="btn btn-primary ">Accept</button>
    </div>
`;
    $('.content-edit-accept').append(template);
    $(".images-detail").empty();
    dataPost.images_room.forEach((image) => {
      var _image = `<img src="${image}" alt="Not Image" class="text-center w-100 img-thumbnail col-3">`
      $(".images-detail").append(_image);
    })
  }).catch((error) => {
    console.log(error);
  })
}

//var status = 'active';

function handleAcceptedPost() {
  var idPost = $(this).attr("data-id");
  var status = 'active';
  $.ajax({
    url: 'owners/update-post-room/' + idPost,
    method: 'put',
    data: { status }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}
function handleCancelPost() {
  var idPost = $(this).attr("data-id");
  var status = 'cancel';
  $.ajax({
    url: 'owners/update-post-room/' + idPost,
    method: 'put',
    data: { status }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}

function handleRestorePost() {
  var idPost = $(this).attr("data-id");
  var status = 'pending';
  $.ajax({
    url: 'owners/update-post-room/' + idPost,
    method: 'put',
    data: { status }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}
function handleHiredAdmin() {
  var idPost = $(this).attr("data-id");
  console.log(idPost);
  var rent_status = 'Hired';
  $.ajax({
    url: 'owners/update-post-room/' + idPost,
    method: 'put',
    data: { rent_status }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      result.message = 'Bạn đã cho thuê thành công';
      alert(result.message);
      $(this).parent().empty();
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}