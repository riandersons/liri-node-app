require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const axios = require("axios");


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

const getMovie = function () {
  const nodeArgs = process.argv;

  // Create an empty variable for holding the movie name
  let movieName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (let i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }

  // Then run a request with axios to the OMDB API with the movie specified
  const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      // If movie not found this will catch the error:
      if(response.data.Response === 'False'){
      console.log(response.data.Error + '  Check your spelling!');      
      }
      // If movie found this will print the data:
      else{
      console.log(response.data);
      console.log('----------------------------------------');
      console.log("Title:  " + response.data.Title);
      console.log('----------------------------------------');
      console.log("Release Year: " + response.data.Year);
      console.log('IMDB Rating:  ' + response.data.Ratings[0].Value);
      console.log('Rotten Tomatoes Rating:  ' + response.data.Ratings[1].Value);
      console.log('Country Produced:  ' + response.data.Country);
      console.log('Language:  ' + response.data.Language);
      console.log('Movie Plot:  ' + response.data.Plot);
      console.log("Actors:  " + response.data.Actors);
      console.log('----------------------------------------');
    }}
  );
}





const pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;

    case 'movie-this':
      getMovie();
      break;

    case 'concert-this':
      getBand();
      break;

    default:
      console.log('LIRI does not know that');
  }
}


const runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
