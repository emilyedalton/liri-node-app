require("dotenv").config();
var axios = require("axios");


var spotifyReq = require("node-spotify-api");

var keys = require('./keys.js');

var spotSearch = new spotifyReq(keys.spotify)


//Take in user input 
const askLiri = process.argv[2];
const value = process.argv[3];


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

function concert (){
    console.log("I am the bands in town function")
    
    
    var searchQ = 'https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp';
    console.log(searchQ);
    //Name of the venue
    axios.get(searchQ).then(
        function(response) {
        for (var index = 0; index < response.length; index++) {

    console.log(response[i].lineup);
        }
    //Venue location

    //Date of the Event (use moment to format this as "MM/DD/YYYY")
        });
}

function spotify(){
    console.log("I am the spotify function")

    spotSearch.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        //Artist(s) name
        console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
         // song
         console.log("\nSong Title: " + JSON.stringify(data.tracks.items[0].name));

         // preview link
         console.log("\nPreview Link: " + JSON.stringify(data.tracks.items[0].preview_url));

         // album
         console.log("\nAlbum Title: " + JSON.stringify(data.tracks.items[0].album.name));

      });
    }

    function AceofBass (){
        console.log("I am the ace of bass function");
    
        spotSearch.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            //Artist(s) name
            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
             // song
             console.log("\nSong Title: " + JSON.stringify(data.tracks.items[0].name));
    
             // preview link
             console.log("\nPreview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
    
             // album
             console.log("\nAlbum Title: " + JSON.stringify(data.tracks.items[0].album.name));
    
          });
        }
// }

// function whatitSays (){
// console.log("I am the whatitSays function")
// }

function movie(){
// const movie = () => {
// Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.


// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {

    //movie title
    console.log("\nTitle: " + response.data.Title);
    // release year 
    console.log("\nRelease Year: " + response.data.Year);
    //IMDB Rating
    console.log("\nIMDB Rating: "  + response.data.imdbRating);
    //Rotten Tomatoes Rating of the movie.
    console.log("\nRotten Tomatoes Rating:" + response.data.Ratings[1].Value);
    //Country where the movie was produced.
    console.log("\nCountry of Production: " + response.data.Country);
    //Language of the movie.
    console.log("\nLanguage: " + response.data.Language);
    // Plot of the movie.
    console.log("\nPlot: " + response.data.Plot);
    //Actors in the movie.
    console.log("\nActors: " + response.data.Actors);


  });
}