$(function () {
  $(".btn-click").on("click", function () {
    let target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
    $('nav a[href^="#"]').parent().removeClass("active");
    $(this).parent().addClass("active");
    return false;
  });

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $("[data-modal=order]").on("click", function () {
    $(".overlay, #order").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #order").fadeOut("slow");
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Пожалуйста,введите {0} символа!"),
        },
        phone: "Пожалуйста, введите номер телефона",
        email: {
          required: "Пожалуйста, введите свю почту",
          email: "Не правильно введен адрес почты",
        },
      },
    });
  }
  valideForms("#order-form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $(".overlay, #consultation").fadeOut();
      $((window.location = "https://notdiet.ru/order.html")).fadeIn();

      $("form").trigger("reset");
    });
    return false;
  });
});
