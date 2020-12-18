getLoginRegister();
function getLoginRegister() {
  // tab-login-subcrible
  console.log() // => 'value  );
  var template;
  if (!Cookies.get('token')) {
    template = `
    <div class="amount-like">
        <div id="amount-like">3</div>
        <i class="far fa-heart"></i></span>
    </div>
    <a href="/login" id="login">Đăng nhập</a>
    <span>/</span>
    <a href="/register" id="subcrible">Đăng ký</a>
    <img src="https://www.worldglasstech.com/wp-content/uploads/2019/02/Flag-of-Vietnam.gif" width="28px" alt="">
    `;
  } else {
    $.ajax({
      method: 'GET',
      url: '/users/user-detail'
    }).then((result) => {
      if (!result.error && result.status === 200) {
        var dataUser = result.dataUser;
        console.log(dataUser);
        template = `
        <div class="amount-like">
            <div id="amount-like">3</div>
            <i class="far fa-heart"></i></span>
        </div>
        <a href='#' id="login">${dataUser.username}</a>
        <span>/</span>
        <button id="logout">Đăng xuất</button>
        <img src="https://www.worldglasstech.com/wp-content/uploads/2019/02/Flag-of-Vietnam.gif" width="28px" alt="">
        `;
        $("#tab-login-subcrible").append(template);

        $("#logout").click(() => {
          Cookies.remove("token");
          window.location.href = '/login';
        })

      }
    }).catch((error) => {
      console.log(error);
    })
  }
  $("#tab-login-subcrible").append(template);
}
