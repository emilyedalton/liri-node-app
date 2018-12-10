require("dotenv").config();
var axios = require("axios");

const keys = require("/Users/emilydalton/Desktop/working/liri-node-app/keys.js");



//Take in user input 
const askLiri = process.argv[2];
var value = process.argv[3];


//Switch case will direct which function will get run 

switch (askLiri) {
case 'concert-this':
  concert();
  break;

 case 'spotify-this-song':
  spotify();
  break;


case 'movie-this':
  movie();
  break;

case 'do-what-it-says':
  whatitSays();
  break;

}

const concert = () => {
    console.log("I am the bands in town function")
}

const spotify = () => {
    console.log("I am the spotify function")
}

function whatitSays (){
console.log("I am the whatitSays function")
}

function movie(){
// const movie = () => {
// Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.
// ---------------------------------------------------------------------------------------------------------

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {

    //movie title
    console.log("Title: " + response.data.Title);
    // release year 
    console.log("Release Year: " + response.data.Year);
    //IMDB Rating
    console.log("IMDB Rating: "  + response.data.imdbRating);
    //Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating:" + response.data.Ratings);
    //Country where the movie was produced.
    console.log("Country of Production: " + response.data.Country);
    //Language of the movie.
    console.log("Language: " + response.data.Language);
    // Plot of the movie.
    console.log("Plot: " + response.data.Plot);
    //Actors in the movie.
    console.log("Actors: " + response.data.Actors);


  });
}