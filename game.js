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


//var randomIndex = Math.floor(Math.random() * words.length);
//var randomWord = words[randomIndex];

var randomWord = "apples";
var randomWord_letters = randomWord.split("");
//console.log(randomWord);
//console.log(randomWord_letters);

//game pieces
var attempts = 8; //establishing the limit of 8 attempts
var dashedWords = {};
var userLetters = "";
var correctLetters = {};
var wrongLetters = {};
var gameOver = {};


var dashes = "";
for(var i =0; i < randomWord.length; i++){
  if (randomWord.charAt(i) == " ") {
   dashes += " ";
 } else {
   dashes += "-";
 }
}
dashedWords.count = dashes;
//console.log(userLetters);
//console.log(dashedWords);
app.get("/index", function(req, res){
  //setting up render "name of file to render", {object:data to send to endpoint}
  res.render("index", {dashedWords:dashes});
});

let messages = [];
app.post("/index", function(req,res){
  userLetters = req.body.letters;
  //console.log(userLetters);

  req.checkBody("letters", "Please enter one letter at a time").isLength({max: 1});
  req.checkBody("letters", "Please enter a letter.").notEmpty();

  let errors = req.validationErrors();
  if (errors){
    errors.forEach(function (error){  //loop thru each entry
     messages.push(error.msg);         //display error message in the array
    });
      res.render("index",{error:messages, dashedWords:dashes});
}
if (!errors && attempts > 0) {
  for (var j = 0; j < randomWord_letters; j++){
    if(randomWord_letters[j] !== req.body.letters){
      wrongLetters.push(req.body.letters);
      attempts = attempts - 1;

      res.render("index", {dashedWords:dashes, wrongLetters:req.body.letters});
}else if (randomWord_letters[n] === req.body.letters){
       dashes[n] = req.body.letters;
       dashes = dashes.join('');
       console.log(dashes);

   res.render("index",{dashedWords:dashes});
} else {
gameOver.msg = "You lose!";
res.render("index", {gameOver:"You lose!"});
}
}
}
});


app.listen(3000, function (){
console.log("App is running on port 3000");
});
