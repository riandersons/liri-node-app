require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
// const spotify = new Spotify(keys.spotify);

 
var spotify = new Spotify(keys.spotify);
  
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    // console.log(data);
    // console.log(data.tracks.items[0]);
    console.log(data.tracks.items[0].artists); 

});
    