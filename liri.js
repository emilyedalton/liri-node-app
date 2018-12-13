require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var spotifyReq = require("node-spotify-api");
var keys = require("./keys.js");
const fs = require("fs");
//spotify key
var spotSearch = new spotifyReq(keys.spotify)
//

//Take in user input 
let askLiri = process.argv[2];
let value = process.argv.slice(3).join(' ');



//Switch case will direct which function will get run 
function start() {
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
}
function concert() {

  console.log("I am the bands in town function")

  var searchQ = 'https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp';
  console.log(searchQ);
  //Name of the venue
  axios.get(searchQ).then(
    function (response) {


      console.log("length" + response.data.length);
      for (i = 0; i < response.data.length; i++) {
      }
      //Venue location
      console.log(`This is the venue: ${response.data[0].venue.name}`);

      //Venue location

      console.log(`This is the city and country of the venue: ${response.data[0].venue.city}, ${response.data[0].venue.country}`);

      //Date of the Event (use moment to format this as "MM/DD/YYYY")
      let concertDate = moment(response.data[0].datetime).format('YYYY-MM-DD')
      console.log(`This is the date: ${concertDate}`);

    });
}

function spotify() {
  console.log("I am the spotify function")
  if(value.trim().length === 0){
    value = "The Sign";

  spotSearch.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //Artist(s) name
    console.log(`\nArtist:  \n${data.tracks.items[0].artists[0].name}`)
    // song
    console.log("\nSong Title: " + (data.tracks.items[0].name));

    // preview link
    console.log("\nPreview Link: " + (data.tracks.items[0].preview_url));

    // album
    console.log("\nAlbum Title: " + (data.tracks.items[0].album.name));

  });
}
}

function movie() {
    // Take the value and trim the extra whitespace from it. If the legnth is 0, change to Mr. Nobody
    if(value.trim().length === 0){
        value = "Mr. Nobody";
  
    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    
    
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
  
    axios.get(queryUrl).then(
      function (response, error) {
         
                if (error) {
                  return console.log("IAM AN error");
                }
  
        //movie title
        console.log("\nTitle: " + response.data.Title);
        // release year 
        console.log("\nRelease Year: " + response.data.Year);
        //IMDB Rating
        console.log("\nIMDB Rating: " + response.data.imdbRating);
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
}



function whatitSays() {
  console.log("I am the whatitSays function")
  // If the code experiences any errors it will log the error to the console.
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    let dataArr = data.split(",");


    

    //making askLiri a "let" enables it to change within this function and be reassigned to the split index [0] of dataARR
    askLiri = dataArr[0];
    console.log("  new  askLiri " +     askLiri );

     //Emily, re-assign global "value" to the search string from the random.txt
    value = dataArr[1];
    console.log("new value" + value);

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    
    // calls the start function again
    start();
  });
}

//In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

//Make sure you append each command you run to the `log.txt` file. 
fs.appendFile("log.txt", askLiri,function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added!");
    }
  
  });

start();