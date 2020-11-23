getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var dataUser = result.dataUser;
      console.log(dataUser);
      var template = ` 
      <!-- Form -->
      <div class="col-md-6 col-sm-4 col-xs-6 card mt-0 pt-0">
      
        <h5 class="card-header info-color white-text text-center py-4">
          <strong>Sign up</strong>
        </h5>
      
        <!--Card content-->
        <div class="card-body px-lg-5 pt-0  text-center" style="color: #757575;">
      
          <!-- Form -->
            <!-- name -->
            <div class="md-form">
              <label for="name">Name </label>
              <input value="${dataUser.name}" type="text" id="name" class="form-control">
              <span id="errorName"></span>
            </div> 
            <!-- phone -->
            <div class="md-form">
              <label for="phone">Phone *</label>
              <input  value="${dataUser.phone}"  type="number" id="phone" class="form-control">
              <span id="errorPhone"></span>
            </div>
            <!-- address -->
            <div class="md-form">
              <label for="address">Address</label>
              <input   value="${dataUser.address}"  type="text" id="address" class="form-control">
              <span id="errorAddress"></span>
            </div> 
            <!-- username -->
            <div class="md-form">
              <label for="username">Username *</label>
              <input  value="${dataUser.username}" type="text" id="username" class="form-control">
              <span id="errorUsername"></span>
            </div>   
            <!-- Sign in button -->
            <button onClick=handleSave.call(this) data-id= ${dataUser._id} class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
              id="btnSignin">Save</button>

            <!-- Social login -->
      
            <a type="button" class="btn-floating btn-fb btn-sm">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a type="button" class="btn-floating btn-tw btn-sm">
              <i class="fab fa-twitter"></i>
            </a>
            <a type="button" class="btn-floating btn-li btn-sm">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a type="button" class="btn-floating btn-git btn-sm">
              <i class="fab fa-github"></i>
            </a>
            
            <!-- Register -->
            <p>Is your profile?
              <a href="/profile">Profile</a>
            </p>  
       
        </div>
      
      
      </div>
        
        `;
      $(".content").append(template);
    }
  }).catch((error) => {

  })
}

function handleSave() {
  var name = $(this).parent().children().find("input#name").val();
  var phone = $(this).parent().children().find("input#phone").val();
  var address = $(this).parent().children().find("input#address").val();
  var username = $(this).parent().children().find("input#username").val();
  var idOwner = $(this).attr("data-id");
  $.ajax({
    url: "/modify-owner/info-user",
    method: "POST",
    data: {
      name,
      phone,
      address,
      username,
      idOwner
    }
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert("Bạn cần chờ phê duyệt từ admin");
        window.location.href = '/waiting-for-approval'
      }
      if (result.error && result.status === 400) {
        alert(result.messageModify);
        window.location.href = '/waiting-for-approval'
      }
    })
  console.log(name, phone, address, username);
}
