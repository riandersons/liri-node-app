require("dotenv").config();

const fs = require('fs');

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const moment = require('moment');
// moment().format();


const getArtistNames = function (artist) {
      return artist.name;
  }

const getMeSpotify = function (songName) {

  // Set default song if no song was entered:
  // if (process.argv[3] === "") {

  //   const songName = "The+Sign";
  // }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    const songs = data.tracks.items;
    for (let i = 0; i < songs.length; i++) {
      console.log(i);
      console.log('Artist(s):  ' + songs[i].artists.map(getArtistNames));
      console.log('Song name:  ' + songs[i].name);
      console.log('Preview link:  ' + songs[i].preview_url);
      console.log('Album:  ' + songs[i].album.name);
      console.log('----------------------------------------');
    };

  });
}

const getMovie = function (movieName) {


  // Set default movie if none was entered:
  // if (movieName === "") {

  // movieName = "Mr+Nobody";



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
  )
};


const getBand = function (artist) {
  // const nodeArgs = process.argv;

  // Create an empty variable for holding the band name
  // let artist = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  // for (let i = 3; i < nodeArgs.length; i++) {

  //   if (i > 3 && i < nodeArgs.length) {
  //     artist = artist + "+" + nodeArgs[i];
  //   }
  //   else {
  //     artist += nodeArgs[i];
  //   }
  // }
  //   if(artist === ""){
  //     artist = "Garth+Brooks";
  //   }

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
        console.log('Artist:  ' + artist);
        console.log('----------------------------------------');
        console.log('Venue:  ' + response.data[0].venue.name);
        console.log('Location:  ' + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log('Event date and time:  ' + moment(response.data[0].datetime).format('MMM DD YYYY   hh:mm a'));
      };
    });
}

const getSays = function () {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    const dataArr = data.split(",");

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
  })
};

const pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;

    case 'movie-this':
      getMovie(functionData);
      break;

    case 'concert-this':
      getBand(functionData);
      break;

    case 'do-what-it-says':
      getSays(functionData);
      break;

    default:
      console.log('LIRI does not know that');
  }
}

// Make selection to start the process...
const runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3])
