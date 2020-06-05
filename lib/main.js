/*---------------------------------------------*/
/* klasola.github.io                           */
/* Author: Kalley Lasola                       */
/* Date: June 03, 2020                         */
/*---------------------------------------------*/

  $(document).ready(function(){
    // placeholder
  });

  var page = {}; // Page object for site 

  // Generates and displays project cards
  page.generateProjects = function(){
    for(let i = 1; i <= numProjects; i++){
      // Create project card
      var project = document.createElement("div");
      project.id = i;
      project.classList.add("project");
      $("#projects-content").append(project);

      // Create project overlay
      var overlay = document.createElement("div");
      overlay.id = i+"Overlay";
      overlay.classList.add("projectOverlay");
      $("#"+i).append(overlay);

      var overlayText = document.createElement("i");
      overlayText.classList.add("fas");
      overlayText.classList.add("fa-external-link-alt");
      $("#"+i+"Overlay").append(overlayText);

      // Add project header
      var header = document.createElement("p");
      header.textContent = projects[i].title;
      $("#"+i).append(header);

      // Add project image preview
      var preview = document.createElement("img");
      preview.src = projects[i].img;
      $("#"+i).append(preview);

      // Add project date
      var date = document.createElement("p");
      date.classList.add("projectDate");
      date.textContent = projects[i].date;
      $("#"+i).append(date);
    }
  }
  page.generateProjects();

  // Listener for opening projects
  $(".project").click(function(){
    var pNum = parseInt(this.id);
    window.open(projects[pNum].url);
  });

  // Overlay listeners
  $(".project")
  .mouseenter(function() {
    // Hide project
    $(this).contents(":not(:first-child)").css("display", "none");
    // Display project overlay
    $("#"+this.id+"Overlay").slideDown();
  })
  .mouseleave(function() {
    // Hide project overlay
    $("#"+this.id+"Overlay").css("display", "none");
    // Display project
    $(this).contents(":not(:first-child)").css("display", "block");
    $(this).find(".projectDate").css("padding", "3%");
  });