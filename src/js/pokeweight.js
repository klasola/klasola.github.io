// PURPOSE: Pokeprice functionality
// AUTHOR: Kalley Lasola

const controller = {};
const MAX_POKEMON = 1025;
controller.p1_weight = 0;
controller.p2_weight = 0;
controller.state = "";
controller.streak = 0;
controller.highestStreak = 0;
controller.weightConversion = 4.536;
controller.qContentSelector = "#q-content";
controller.messageSelector = "#message";

controller.getRandNum = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

controller.getPokemon = async function(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}

controller.useShiny = function() {
  // 10% chance
  let num = controller.getRandNum(1, 20);
  if (num == 5) {
    return true;
  }
  else return false;
}

controller.getSprite = function(pokemon) {
  return pokemon.sprites.front_default;
}

controller.getShinySprite = function(pokemon) {
  return pokemon.sprites.front_shiny;
}

controller.generatePokemon = async function(index, pWeight) {
  let mon = await controller.getPokemon(controller.getRandNum(1, MAX_POKEMON));
  let mon_name = mon.name.charAt(0).toUpperCase() + mon.name.slice(1);
  if (controller.useShiny() && (mon.sprites.front_shiny)) {
    $("#pokemon"+index+" .p-name").html("&#9734; "+mon_name+" &#9734;");
    $("#pokemon"+index+" .p-name").addClass('shiny');
    $("#pokemon"+index+" img").attr("src", controller.getShinySprite(mon));
  } else {
    $("#pokemon"+index+" .p-name").html(mon_name);
    $("#pokemon"+index+" .p-name").removeClass('shiny');
    $("#pokemon"+index+" img").attr("src", controller.getSprite(mon));
  }
  $("#q-name-"+index).html(mon_name);
  controller[pWeight] = Math.round(mon.weight / 4.536);
}

controller.updateStreaks = function() {
  $('#streak').html(controller.streak);
  $('#highest-streak').html(controller.highestStreak);
}

controller.showWeights = function() {
  $("#pokemon1 .p-weight").html(controller.p1_weight + " lbs");
  $("#pokemon2 .p-weight").html(controller.p2_weight + " lbs");
}

controller.hideWeights = function() {
  $("#pokemon1 .p-weight").html("");
  $("#pokemon2 .p-weight").html("");
}

controller.refresh = function() {
  $("#message").html("");
  controller.hideWeights();
  controller.generatePokemon();
  setTimeout(function() {
    $("#q-content").show();
  }, 500);
}

controller.refreshDisplay() = function(message) {
  // Hide display while counters are updated
  $(controller.qContentSelector).hide();
  $(controller.messageSelector).html(message);
  controller.showWeights();
  setTimeout(function() {
    controller.refresh();
  }, 3000);
}

controller.updateDisplay = function() {
  if (controller.state) {
    // Correct
    controller.streak = controller.streak + 1;
    if (controller.streak > controller.highestStreak) {
      controller.highestStreak = controller.streak;
    }
    controller.updateStreaks();
    controller.refreshDisplay("Correct!");
  } else {
    // Incorrect
    controller.streak = 0;
    controller.updateStreaks();
    controller.refreshDisplay("Wrong!");
  }
}

controller.setListeners = function() {
  $("#fatter-button").click(function() {
    if (controller.p1_weight >= controller.p2_weight) {
      controller.state = true;
    } else {
      controller.state = false;
    }
    controller.updateDisplay();
  });

  $("#skinnier-button").click(function() {
    if (controller.p1_weight <= controller.p2_weight) {
      controller.state = true;
    } else {
      controller.state = false;
    }
    controller.updateDisplay();
  });
}

$( document ).ready(async function() {
  controller.generatePokemon(1, p1_weight);
  controller.generatePokemon(2, p2_weight);
  controller.setListeners();
  controller.updateStreaks();
});
