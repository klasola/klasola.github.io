// PURPOSE: Personal portfolio website JS
// AUTHOR: Kalley Lasola
// DATE MODIFIED: Mar 9, 2022

var controller = {};
controller.projects = [
  {
    title: 'Design Our Climate simulation (DOCs)',
    description: 'Create your own climate action plan to reduce Carbon emissions by exploring a mosaic of strategies',
    image: '/src/assets/img/docs-preview.png',
    alt: 'Design Our Climate simulation preview',
    link: 'https://climatesolutions.kcvs.ca/',
    tags: '',
    state: true
  },
  {
    title: 'Visualizing Global Climate Change',
    description: 'Visually displays changes to global climate factors based on the IPCC\'s RCP Emissions Scenarios',
    image: '/src/assets/img/vgcc-preview.png',
    alt: 'Visualizing Global Climate Change preview',
    link: 'http://applets.kcvs.ca/visualizingGlobalClimateChange/visualizingGlobalClimateChange.html',
    tags: ''
  },
  {
    title: 'Build a Planet',
    description: 'Better understand the Earth\'s radiation balance by exploring other planet\'s climatic conditions',
    image: '/src/assets/img/bap-preview.png',
    alt: 'Build a Planet preview',
    link: 'https://applets.kcvs.ca/BuildAPlanet/buildAPlanet.html',
    tags: ''
  },
  {
    title: 'Water Pressure Versus Temperature',
    description: 'An applet that allows you to explore the kinetic energy in water molecules as the temperature increases',
    image: '/src/assets/img/wpvt-preview.png',
    alt: 'Our Future Edmonton preview',
    link: 'https://applets.kcvs.ca/waterPressureVTemp/waterPressureVTemp.html',
    tags: ''
  },
  {
    title: 'Our Future Edmonton',
    description: 'Explore the City of Edmonton\'s plans to make Edmonton an energy sustainable city',
    image: '/src/assets/img/ofe-preview.png',
    alt: 'Our Future Edmonton preview',
    link: 'https://futureyeg.kcvs.ca/',
    tags: ''
  }
];

controller.init_projects = function() {
  var carousel = $('.carousel-inner');
  controller.projects.forEach(function(proj) {
    var append_string = '<div class="carousel-item">';
    if (proj.state) {
      var append_string = '<div class="carousel-item active">';
    } else {
      var append_string = '<div class="carousel-item">';
    }
    append_string += '<div class="card" style="width: 18rem;"><img src="'+proj.image+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+proj.title+'</h5><p class="card-text">'+proj.description+'</p><a href="'+proj.link+'" target="_blank" class="btn btn-success">Launch</a></div></div>';
    carousel.append(append_string);
    append_string = '';
  });
}

// Toggles active status of nav links
controller.toggle_nav = function(nav) {
  $('.nav-link.active').removeClass('active');
  nav.addClass('active');
}

// Toggles main content according to nav click
controller.toggle_content = function(nav) {
  $('.content-block.active-content-block').removeClass('active-content-block');
  var section = nav.attr('content-block');
  $('#' + section + '-container').addClass('active-content-block');
}

// Adds a blinking effect to anything with the blinking class
controller.blink = function() {
  setInterval(function() {
    if($('.blinking').css('opacity') == 1) {
      $('.blinking').css('opacity', '0');
    } else {
      $('.blinking').css('opacity', '1');
    }
  }, 500);
}

$( document ).ready(function() {
  controller.init_projects();
  controller.blink();

  $('.nav-link').click(function(){
    controller.toggle_nav($(this));
    controller.toggle_content($(this));
  });
});