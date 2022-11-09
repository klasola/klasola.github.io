// PURPOSE: FOR DIMA
// AUTHOR: Kalley Lasola
// DATE MODIFIED: Nov 8, 2022

var controller = {};

controller.orientation = 'front';
controller.spritePath = '/src/assets/sprites/';

controller.delay = function(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

controller.walk = async function(direction) {
    for (i = 1; i < 5; i++) {
        $('#character img').attr("src", controller.spritePath + direction + i + ".png");
        await controller.delay(300);
        i = i == 4 ? 0 : i;
    }
}

controller.showModal = function() {
    $('.show-button').addClass("hidden");
    $('#modal').removeClass("hidden");
    setTimeout(function() {
        $('#modal').css("display", "flex");
    }, 500);
}

controller.dismissModal = function() {
    $('#modal').addClass("hidden");
    setTimeout(function() {
        $('#modal').css("display", "none");
    }, 500);
}

controller.retry = function() {
    $('.show-button').removeClass("hidden");
}

document.onkeyup = function(e) {
    e.preventDefault
    if (e.key == "ArrowLeft") { controller.walk('left'); }
    if (e.key == "ArrowRight") { controller.walk('right'); }
    if (e.key == "ArrowUp") { controller.walk('up'); }
    if (e.key == "ArrowDown") { controller.walk('down'); } 
};

$( document ).ready(function() {
  $('.dismiss-button').click(controller.dismissModal);
  $('.show-button').click(controller.showModal);
});