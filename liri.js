require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const moment = require('moment');
moment().format();

 
const getMeSpotify = function () {

  const nodeArgs = process.argv;

  // Create an empty variable for holding the song name
  let songName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (let i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
    }
    else {
      songName += nodeArgs[i];

    }
  }
  // Set default song if no song was entered:
  if (songName === "") {

    songName = "The+Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].album.name);
    for (let j = 0; j < data.tracks.items.length; j++) {
      for (let i = 0; i < data.tracks.items[0].artists.length; i++) {
        console.log('Artist name:  ' + data.tracks.items[j].artists[i].name);
        console.log('Song name:  ' + data.tracks.items[j].name);
        console.log('Preview link:  ' + data.tracks.items[j].artists[i].external_urls.spotify);
        console.log('Album:  ' + data.tracks.items[j].album.name);
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
  // Set default movie if none was entered:
  if (movieName === "") {

    movieName = "Mr+Nobody";
  }


  // Then run a request with axios to the OMDB API with the movie specified
  const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      // If movie not found this will catch the error:
      if (response.data.Response === 'False') {
        console.log(response.data.Error + '  Check your spelling!');
      }
      // If movie found this will print the data:
      else {
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
      }
    }
  );
}

const getBand = function () {
  const nodeArgs = process.argv;

  // Create an empty variable for holding the band name
  let artist = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (let i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
    }
    else {
      artist += nodeArgs[i];
    }
  }
    if(artist === ""){
      artist = "Garth+Brooks";
    }

  // Then run a request with axios
  const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  // console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      // console.log(response);
      if (response.data === "\n{warn=Not found}\n") {
        console.log("Artist / Band not found! ");
      }
      else {
        console.log('----------------------------------------');
        console.log('Artist:  '+ artist);
        console.log('----------------------------------------');
        console.log('Venue:  ' + response.data[0].venue.name);
        console.log('Location:  ' + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log('Event date and time:  ' + moment(response.data[0].datetime).format('MMM DD YYYY   hh:mm a'));
      };
    });
}


const pick = function() {
  const selection = process.argv[2];
  switch (selection) {
    case 'spotify-this-song':    
    getMeSpotify();
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

// Make selection to start the process...
pick();

