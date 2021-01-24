/*---------------------------------------------*/
/* klasola.github.io                           */
/* Author: Kalley Lasola                       */
/* Date: Jan 23, 2021                          */
/*---------------------------------------------*/

  $(document).ready(function(){
    game.init();
  });

  // Objects and config
  var game = {};
  var board = {};
  board.size = 8;
  board.mines = 6;

  // Initializes game
  game.init = function(){
    board.init();
  }

  // Display request page (rules or credits)
  game.showPage = function(page){
    $('#board').slideUp();
    $('#'+page).slideDown();

    // Hide all
    if(page == 'rules'){
      $('#about').slideUp();
    }else{
      $('#rules').slideUp();
    }
  }

  // Hides request page (rules or credits)
  game.hidePage = function(page){
    $('#'+page).slideUp();
    $('#board').slideDown();
  }

  // Initializes board
  board.init = function(){

    // Create board
    for(i=0; i<board.size+1; i++){
      var row_str = "<div class='row'>";
      for(j=0; j<board.size+1; j++){
        row_str += "<div class='square' id='"+i+j+"' ></div>";
      }
      row_str += "</div>";
      document.getElementById('board').innerHTML += row_str;
    }

    board.draw();
    board.setMines();
  }
  
  // Fill in alternating squares and coordinates
  board.draw = function(){
    for(i=0; i<board.size+1; i++){
      for(j=0; j<board.size+1; j++){
        // Set coordinates
        if(j == 0 || i == board.size){
          $('#'+i+j).addClass('coords');
          if(j == 0){
            if(i == board.size){
              $('#'+i+j).css('height', '20px');
              $('#'+i+j).css('width', '20px');
            }else{
              var num = board.size - (i+1) + 1;

              $('#'+i+j).addClass('coords-num');
              $('#'+i+j).html(''+num);
            }
          }else{
            var alpha = toAlpha(j);

            $('#'+i+j).addClass('coords-alpha');
            $('#'+i+j).html(''+alpha);
          }
        }else{
          // Set alternating squares
          if(i % 2 == 0){
            if(j % 2 == 0){
              $('#'+i+j).addClass('alt');
            }
          }else{
            if(j % 2 != 0){
              $('#'+i+j).addClass('alt');
            }
          }
        }
      }
    }
  }

  // Initializes mines
  board.setMines = function(){
    $('.mines').each(function(){
      for(i=0; i<board.mines; i++){
        $('#'+this.id).append('<img src="/img/mine.png" class="mine">');
      }
    });
  }

  // Converts a number to its alphabet character equivalent
  // Credit: https://www.tutorialspoint.com/convert-number-to-alphabet-letter-javascript
  const toAlpha = (num) => {
    if(num < 1 || num > 26 || typeof num !== 'number'){
      console.log(num);
      return -1;
    }
    const leveller = 64;

    return String.fromCharCode(num + leveller);
  };