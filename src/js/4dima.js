// PURPOSE: FOR DIMA
// AUTHOR: Kalley Lasola
// DATE MODIFIED: Nov 16, 2022

var controller = {};

controller.orientation = 'front';
controller.spritePath = '/src/assets/sprites/';
controller.starPath = '/src/assets/kit/PNG/Icons/Icon05.png';
controller.speedUpPath = '/src/assets/kit/PNG/Icons/Icon38.png';
controller.incrementSpeed = 10;
controller.minPx = 30;
controller.collectedStars = 0;
controller.numStars = 20;
controller.numSpeeds = 3;

controller.incrementStep = function(attr, force) {
    var pxVal = parseInt($('#character').css(attr));
    var increment = controller.incrementSpeed;
    var baseThreshold = controller.minPx;
    if (force == "neg" && (pxVal - increment) > baseThreshold) {
        $('#character').css(attr, (pxVal - increment) + "px");
    } else if (force == "pos") {
        var newPxVal = (pxVal + increment);
        var rightThreshold = $('#game-container').width() - (baseThreshold - 10);
        var bottomThreshold = $('#game-container').height() - baseThreshold;
        if ((attr == "top" && newPxVal < bottomThreshold) || (attr == "left" && newPxVal < rightThreshold)) {
            $('#character').css(attr, (pxVal + increment) + "px");
        }
    }
}

controller.collectedElement = function(type, len) {
    for (let i = 0; i < len; i++) {
        var overlapped = controller.checkOverlap($('#character'), $('#' + type + i));
        if (overlapped) {
            $('#' + type + i).addClass('hidden');
            return true;
        }
    }
    return false;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

controller.move = function(attr, force) {
    if (controller.gameDone()) {
        controller.clearSpeeds();
        $('#character').addClass('hidden');
        $('#game-over-message').css("display", "block");
        $('#game-over-message').removeClass('hidden');
    } else {
        controller.incrementStep(attr, force);

        if (controller.collectedElement("star", controller.numStars)) {
            // 
        }
        if (controller.collectedElement("speed", controller.numSpeeds)) {
            $('#message').text('SPEED UP');
            $('#message').removeClass('hidden');
            delay(1500).then(() => $('#message').addClass('hidden'));
            controller.incrementSpeed++;
        }
    }
}

controller.gameDone = function() {
    var flag = true;
    for (let i = 0; i < controller.numStars; i++) {
        if (!$('#star' + i).hasClass('hidden')) {
            flag = false;
        }
    }
    return flag;
}

controller.clearSpeeds = function() {
    for (let i = 0; i < controller.numSpeeds; i++) {
        $('#speed' + i).addClass('hidden');
    }
}

controller.walk = function(dir) {
    $('#character img').attr("src", controller.spritePath + dir + ".png");
    if (dir == "up") { controller.move("top", "neg"); }
    if (dir == "down") { controller.move("top", "pos"); }
    if (dir == "left") { controller.move("left", "neg"); }
    if (dir == "right") { controller.move("left", "pos"); }
}

controller.increaseSpeed = function() {
    controller.incrementSpeed = controller.incrementSpeed + 5;
}

controller.checkOverlap = function(e1, e2) {
    const domRect1 = e1.get(0).getBoundingClientRect();
    const domRect2 = e2.get(0).getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}

controller.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

controller.placeItems = function(len, type, path) {
    for (let i = 0; i < len; i++) {
        var element = $('<img>',{id:type + i, class:type, src:path});
        var top = controller.getRandomInt(controller.minPx, ($('#game-container').height() - controller.minPx));
        var left = controller.getRandomInt(controller.minPx, ($('#game-container').width() - controller.minPx));
        element.css("top", top);
        element.css("left", left);
        $("#game-container").append(element); 
    }
}

controller.hideDisplay = function() {
    $('#objective').addClass("hidden");
    $('#start').addClass("hidden");
    $('#message').addClass('hidden');
    $('#character').removeClass('hidden');
}

controller.init = function() {
    controller.hideDisplay();
    controller.placeItems(controller.numStars, 'star', controller.starPath);
    controller.placeItems(controller.numSpeeds, 'speed', controller.speedUpPath);
    $('.start-button').unbind();
}

controller.startKeyListeners = function() {
    $(document).on('keydown', function(e){
        if (e.key == "ArrowLeft") { 
            e.preventDefault();
            controller.walk('left');
        } else if (e.key == "ArrowRight") { 
            e.preventDefault();
            controller.walk('right'); 
        } else if (e.key == "ArrowUp") { 
            e.preventDefault();
            controller.walk('up'); 
        } else if (e.key == "ArrowDown") { 
            e.preventDefault();
            controller.walk('down'); 
        }
    });
}

$(document).ready(function() {
    controller.startKeyListeners();
    $('#start').click(controller.init);
});