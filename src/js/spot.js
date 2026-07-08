
var controller = {};
controller.factors = {
  "acousticness": 0.5,
  "energy": 0.5,
  "danceability": 0.5,
  "instrumentalness": 0.5,
  "valence": 0.5
}
controller.recommendations = [];

const clientId = '861b1a7cfeb944dfbad3e6049696639b';
const clientSecret = '244f6dd9aa7e41a88b21c20a7bdabc78';

controller.getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  console.log(data);
  return data.access_token;
}

controller.getRecommendation = async (token) => {
  const result = await fetch('https://api.spotify.com/v1/recommendations?limit=5&seed_genres=pop%2Cdance%2Crap%2Calternative%2Cchill&target_energy='+controller.factors.energy+"&target_acousticness="+controller.factors.acousticness+'&target_danceability='+controller.factors.danceability+'&target_instrumentalness='+controller.factors.instrumentalness+'&target_valence='+controller.factors.valence, {
    method: 'GET',
    headers: { 
      'Authorization' : 'Bearer ' + token
    }
  });

  const data = await result.json();
  return data.tracks;
}

controller.displayRecommendations = () => {
  let recommendationsEl = $('#recommendations-container');
  recommendationsEl.removeClass('hidden');
  $('#input-container').addClass('hidden');
  let tracks = controller.recommendations;
  console.log(tracks);
  for(i=0; i<tracks.length; i++) {
    let title = tracks[i].name;
    let artist = tracks[i].artists[0].name;
    let albumImg = tracks[i].album.images[0].url;
    let link = tracks[i].external_urls.spotify;
    recommendationsEl.append('<div class="recommendation"><a target="_blank" href="'+link+'"><img src="'+albumImg+'" class="album-img"></a><div class="track-details"><span class="title">'+title+'</span><span class="artist">'+artist+'</span></div></div>');
  }
}

controller.setInputListeners = (id) => {
  let slider = $('#' + id);
  slider.on('input change', function() {
    controller.factors[id] = parseInt(this.value) / 100;
  });
}

$(document).ready(async function() {
  // Input listeners
  controller.setInputListeners("danceability");
  controller.setInputListeners("energy");
  controller.setInputListeners("instrumentalness");
  controller.setInputListeners("acousticness");
  controller.setInputListeners("valence");
  // State listener
  $('.return-button').click(function() {
    $('div.recommendation').remove();
    $('#recommendations-container').addClass('hidden');
    $('#input-container').removeClass('hidden');
  });
  // CTA listener
  $("#input-container button").click(async function() {
    console.log("Fetching...");
    const token = await controller.getToken();
    controller.recommendations = await controller.getRecommendation(token);
    controller.displayRecommendations();
  });
});