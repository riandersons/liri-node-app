require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);



const getMeSpotify = function (songName) {

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    for (let j = 0; j < data.tracks.items.length; j++) {
    for (let i = 0; i < data.tracks.items[0].artists.length; i++) {
      console.log('Artist name:  ' + data.tracks.items[j].artists[i].name);
      console.log('Song name:  ' + data.tracks.items[j].name);
      console.log('Preview link:  ' + data.tracks.items[j].artists[i].external_urls.spotify);
      console.log('----------------------------------------');
    };
    };
  });
}

const pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    default:
      console.log('LIRI does not know that');
  }
}

const runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);