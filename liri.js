require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const spotifyReq = require("node-spotify-api");
const keys = require("./keys.js");
const fs = require("fs");
//spotify key
let spotSearch = new spotifyReq(keys.spotify)
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

    let searchQ = `https://rest.bandsintown.com/artists/${value}/events?app_id=codingbootcamp`;
    console.log(searchQ);
    //Name of the venue
    axios.get(searchQ).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
            }
            //Artist(s)
            console.log(`\n\x1b[36mArtists(s):\n\x1b[0m\n\x1b[33m${response.data[0].lineup}\x1b[0m`);

            //Venue

            console.log(`\n\x1b[36mName of the Venue:\n\x1b[0m\n\x1b[33m${response.data[0].venue.name}\x1b[0m`);

            //Venue location

            console.log(`\n\x1b[36mVenue Location:\n\x1b[0m\n\x1b[33m${response.data[0].venue.city}, ${response.data[0].venue.country}\x1b[0m`);

            //Date of the Event (use moment to format this as "MM/DD/YYYY")
            let concertDate = moment(response.data[0].datetime).format('MM/DD/YYYY')
            console.log(`\n\x1b[36mDate of the Event:\n\x1b[0m\n\x1b[33m${concertDate}\x1b[0m`);

        });
}

function spotify() {
    if (value.trim().length === 0) {
        value = "All I Want for Christmas";
    }

    spotSearch.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //Artist(s) name
        console.log(`\n\x1b[31mArtist(s):\n\x1b[0m\n\x1b[33m${data.tracks.items[0].artists[0].name}\x1b[0m`)
        // song
        console.log(`\n\x1b[31mThe song's name:\n\x1b[0m\n\x1b[33m${data.tracks.items[0].name}\x1b[0m`);

        // preview link
        console.log(`\n\x1b[31mPreview link of the song from Spotify:\n\x1b[0m\n\x1b[33m${data.tracks.items[0].preview_url}\x1b[0m`);

        // album
        console.log(`\n\x1b[31mThe album that the song is from:\n\x1b[0m\n\x1b[33m${data.tracks.items[0].album.name}\x1b[0m`);

    });
}

function movie() {
    // Take the value and trim the extra whitespace from it. If the legnth is 0, change to Mr. Nobody
    if (value.trim().length === 0) {
        value = "Mr. Nobody";
    }

    // Then run a request with axios to the OMDB API with the movie specified
    let queryUrl = `http://www.omdbapi.com/?t="${value}&y=&plot=short&apikey=trilogy`;

    // This line is just to help us debug against the actual URL.

    axios.get(queryUrl).then(
        function (response, error) {

            if (error) {
                return console.log("error");
            }

            //movie title
            console.log(`\n\x1b[35mTitle of the movie:\x1b[0m\n\x1b[33m${response.data.Title}\x1b[0m`);
            // release year 
            console.log(`\n\x1b[35mYear the movie came out:\n\x1b[0m\x1b[33m${response.data.Year}\x1b[0m`);
            //IMDB Rating
            console.log(`\n\n\x1b[35mIMDB Rating of the movie:\n\x1b[0m\x1b[33m${response.data.imdbRating}\x1b[0m`);
            //Rotten Tomatoes Rating of the movie.
            console.log(`\n\x1b[35mRotten Tomatoes Rating of the movie:\n\x1b[0m\x1b[33m${response.data.Ratings[1].Value}\x1b[0m`);
            //Country where the movie was produced.
            console.log(`\n\x1b[35mCountry where the movie was produced:\n\x1b[0m\x1b[33m${response.data.Country}\x1b[0m`);
            //Language of the movie.
            console.log(`\n\x1b[35mLanguage of the movie:\n\x1b[0m\x1b[33m${response.data.Language}\x1b[0m`);
            // Plot of the movie.
            console.log(`\n\x1b[35mPlot of the movie:\n\x1b[0m\x1b[33m${response.data.Plot}\x1b[0m`);
            //Actors in the movie.
            console.log(`\n\x1b[35mActors in the movie:\n\x1b[0m\x1b[33m${response.data.Actors}\x1b[0m`);

        });
}




function whatitSays() {
    // If the code experiences any errors it will log the error to the console.
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        // prints the contents of data
        console.log(` This is the command from random.txt: ${data}`);

        // Then split it by commas (to make it more readable)
        let dataArr = data.split(",");




        //making askLiri a "let" enables it to change within this function and be reassigned to the split index [0] of dataARR
        askLiri = dataArr[0];

        //Reassigning global "value" to the search string from the random.txt
        value = dataArr[1];


        // calls the start function again
        start();
    });
}

//In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

//Make sure you append each command you run to the `log.txt` file. 
fs.appendFile("log.txt", askLiri + " " + value + ", " + " ", function (err) {

    // If an error was experienced we will log it.
    if (err) {
        console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Check out Log.txt to see all of the executd commands!" to our node console.
    else {
        console.log("\x1b[35mCheck out\x1b[0m \x1b[33mLog.txt\x1b[0m \x1b[36mto see\x1b[0m \x1b[32ma list\x1b[0m \x1b[35mof all\x1b[0m \x1b[34mof the \x1b[31mexecuted commands!\x1b");
    }

});

start();