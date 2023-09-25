var controller = {};

controller.gifts = [
  "https://mywordle.strivemath.com/?word=zocopc",
  "https://crosswordlabs.com/embed/guess-that-pokemon-5",
  "/src/assets/img/wrapped.png"
];

function openGift(index) {
  window.open(controller.gifts[index]);
};

$( document ).ready(function() {});