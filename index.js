var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/public"));




app.get("/", function(req, res) {
	// res.send("test1");
	res.render("index");
})


app.get("/results", function(req, res) {
	// res.send("test2");
	// res.send(req.query.title); 
	// res.render("results", {title:req.query.title});

	var searchTerm = req.query.title;

	request("http://www.omdbapi.com/?s=" + searchTerm, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    	// console.log(body);
  		var content = JSON.parse(body);
    	res.render("results", {search:content.Search || []});
  		}
	})
})


app.get("/movies/:imdb", function(req, res) {
	// res.send("test3");
	var imdbNumber = req.params.imdb;

	request("http://www.omdbapi.com/?i=" + imdbNumber + "&tomatoes=true&", function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    	// console.log(body);
  		var justObj = JSON.parse(body);
  		console.log(justObj);
    	res.render("movies", justObj);
  		}
	})
})




app.listen(3000);