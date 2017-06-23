const express = require("express");
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
//requiring data validation
const expressValidator = require("express-validator");
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

//console.log(words);

//the data type that the body parser will parse
app.use(bodyParser.urlencoded({extended: false}));
//body parser json
app.use(bodyParser.json());
//Validator has to go rigt after body parser
app.use(expressValidator());
//allow app to see the contents of the public folder
app.use(express.static("public"));

//setting up the middleware: mustache
app.engine("mustache", mustacheExpress());
app.set("views","./views");
app.set("view engine", "mustache");


var randomIndex = Math.floor(Math.random() * words.length);
var randomWord = words[randomIndex];

console.log(randomWord);

//creating dashes for each letter in randomWord
var dashedWords = {};

 var guessedLetters = {};
 var dashes = "";
for(var i =0; i < randomWord.length; i++){
  if (randomWord.charAt(i) == " ") {
   dashes += " ";
 } else {
   dashes += "-";
 }
}
dashedWords.count = dashes;
console.log(dashedWords);

app.get("/game", function(req, res){
  //setting up render "name of file to render", data to send to it
  console.log(req.body);
  res.render("game", {dashName:dashes});
});


app.listen(3000, function (){
console.log("App is running");
});
