// PURPOSE: Pokeprice functionality
// AUTHOR: Kalley Lasola

const controller = {};
const MAX_POKEMON = 1025;
controller.p1_weight = 0;
controller.p2_weight = 0;
controller.state = "";
controller.streak = 0;
controller.highestStreak = 0;

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

controller.generatePokemon = async function() {
  // Populate first pokemon
  let p1 = await controller.getPokemon(controller.getRandNum(1, MAX_POKEMON));
  let p1_name = p1.name.charAt(0).toUpperCase() + p1.name.slice(1);
  if (controller.useShiny() && (p1.sprites.front_shiny)) {
    $("#pokemon1 .p-name").html("&#9734; "+p1_name+" &#9734;");
    $("#pokemon1 .p-name").addClass('shiny');
    $("#pokemon1 img").attr("src", controller.getShinySprite(p1));
  } else {
    $("#pokemon1 .p-name").html(p1_name);
    $("#pokemon1 .p-name").removeClass('shiny');
    $("#pokemon1 img").attr("src", controller.getSprite(p1));
  }
  $("#q-name-1").html(p1_name);
  controller.p1_weight = Math.round(p1.weight / 4.536);

  // Populate second pokemon
  let p2 = await controller.getPokemon(controller.getRandNum(1, MAX_POKEMON));
  let p2_name = p2.name.charAt(0).toUpperCase() + p2.name.slice(1);
  if (controller.useShiny() && (p2.sprites.front_shiny)) {
    $("#pokemon2 .p-name").html("&#9734; "+p2_name+" &#9734;");
    $("#pokemon2 .p-name").addClass('shiny');
    $("#pokemon2 img").attr("src", controller.getShinySprite(p2));
  } else {
    $("#pokemon2 .p-name").html(p2_name);
    $("#pokemon2 .p-name").removeClass('shiny');
    $("#pokemon2 img").attr("src", controller.getSprite(p2));
  }
  $("#q-name-2").html(p2_name);
  controller.p2_weight = Math.round(p2.weight / 4.536);
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

controller.updateDisplay = function() {
  if (controller.state) {
    // Correct
    controller.streak = controller.streak + 1;
    if (controller.streak > controller.highestStreak) {
      controller.highestStreak = controller.streak;
    }
    controller.updateStreaks();
    $("#q-content").hide();
    $("#message").html("Correct!");
    controller.showWeights();
    setTimeout(function() {
      controller.refresh();
    }, 3000);
  } else {
    // Incorrect
    controller.streak = 0;
    controller.updateStreaks();
    $("#q-content").hide();
    $("#message").html("Wrong!");
    controller.showWeights();
    setTimeout(function() {
      controller.refresh();
    }, 3000);
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
  controller.generatePokemon();
  controller.setListeners();
  controller.updateStreaks();
});
