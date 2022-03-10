// PURPOSE: Personal portfolio website JS
// AUTHOR: Kalley Lasola
// DATE MODIFIED: Mar 9, 2022

var controller = {};

controller.toggleNav = function() {
  $('.nav-link').click(function(){
    $('.nav-link.active').removeClass('active');
    $(this).addClass('active');
  });
}

$( document ).ready(function() {
  
  controller.toggleNav();
});