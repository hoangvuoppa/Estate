$(document).ready(function () {
  getData();
  function getData() {
    $.ajax({
      method: 'GET',
      url: '/users/user-detail'
    }).then((result) => {
      if (!result.error && result.status === 200) {
        var dataUser = result.dataUser;
        console.log(dataUser);
        var username = `${dataUser.username}`;
        $("button.nav-item .nav-link span").text(username);
      }
    }).catch((error) => {

    })
  }
  /* About */
  new WOW().init();
  /* End about */
  /* Code menu */
  $('body').scrollspy({

    target: '#containerMenu'

  });

  $(window).scroll(function () {

    var posBody = $('body,html').scrollTop();

    if (posBody > 0) {

      $('.menus').addClass("scrollUp");

    }

    else {

      $('.menus').removeClass("scrollUp");

    }

  });

  $("li.nav-item a.nav-link").click(function (e) {
    e.preventDefault();

    var attr = $(this).attr('href');

    var posAttr = $(attr).offset().top;
    $('html').animate({

      scrollTop: posAttr,

    }, 1000, 'easeInExpo')

  });
  /* End menu */
  /* Code Portfolio */

  $(".blockImagePortfolio").isotope({

    itemSelector: '.blockImagePortfolio .col-sm-4',

  });

  $('.topPortfolio label').click(function (e) {

    e.preventDefault();

    $(".topPortfolio label").removeClass('actives')

    $(this).addClass('actives')

    var dataClass = $(this).data('class');

    console.log(dataClass);

    dataClass = '.' + dataClass;

    if (dataClass == '.all') {

      $(".blockImagePortfolio").isotope({

        filter: '*'

      })

    } else {

      $(".blockImagePortfolio").isotope({

        filter: dataClass

      })

    }

  });
  /* Button on Top */
  $(window).scroll(function () {
    var posBody = $("body,html").scrollTop();
    if (posBody > 100) {
      $('.buttonOnTop').addClass('visited');
    } else {
      $('.buttonOnTop').removeClass('visited');
    }
  });
  $('.buttonOnTop').click(function (e) {
    e.preventDefault();
    $("html,body").animate({
      scrollTop: 0,
    }, 2000, 'easeOutExpo');
  });
});
$(".blockDropDownOne #logout").click(() => {
  Cookies.remove("token");  
  window.location.href = '/login'; 
})

