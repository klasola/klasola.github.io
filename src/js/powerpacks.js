
var controller = {};

$(document).ready(function() {
  $(".textbox").one("click", () => {
    $(".textbox-text").html("Open?");
    $(".yes").html("&#9654; Yes");
    $(".yes").on("mouseenter", function() {
      $(this).addClass("is-hovered");
    }).on("mouseleave", function() {
      $(this).removeClass("is-hovered");
    });
    $(".textbox").off("click");
  });

  $(".yes").one("click", () => {
    $(".textbox-text").html("Happy Birthday Dima!");
    $(".yes").html("");
    $(".enemy-sprite").attr("src", "/src/assets/img/ampharoil.png");
    $(".enemy-sprite").on("mouseenter", function() {
      $(this).addClass("is-hovered");
    }).on("mouseleave", function() {
      $(this).removeClass("is-hovered");
    });

    $(".enemy-sprite").click(function(){
      var imgSrc = "/src/assets/img/ampharoil.png";
      window.open(imgSrc, '_blank'); 
    });
  });
});