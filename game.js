const express = require("express");
const app = express();
const mustacheExpress = require('mustache-express');
const path = require("path");
const session = require("express-session");
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
//Validator has to go right after body parser
app.use(expressValidator());
//allow app to see the contents of the public folder
app.use(express.static("public"));

//setting up the middleware: mustache-used to view the pages
app.engine("mustache", mustacheExpress());
app.set("views","./views");
app.set("view engine", "mustache");

app.use(session({
 secret:'love',
 resave: false,
 saveUninitialized: false
}));


var randomIndex = Math.floor(Math.random() * words.length);
var word = words[randomIndex];

//var word = "atom";
var randomWord = word.split("");
//console.log(randomWord);


//game data
let points = 0;
 let attempts = 8;
 let dashedWord = [];
 let userGuesses = [];
 let wrongLetters = [];
 let gameOver = {msg: "You lose.Play again."};


 randomWord.forEach(function(newUnderscore){
   dashedWord.push("_");
 });

 app.get("/gameover", function(req, res){
   res.render("gameover",{loser:gameOver.msg, word:word});
 });

 app.get("/winner", function(req, res){
   res.render("winner");
 });

let messages = [];
// if (attempts > 0) {
app.post("/", function(req,res){

  let letter = req.body.userguess.toLowerCase();
  let userletter = randomWord.indexOf(letter);


    req.checkBody("userguess", "Please enter one letter at a time").isLength({max: 1});
    req.checkBody("userguess", "Please enter a letter.").notEmpty();
    req.checkBody("userguess", "Please enter letters only").isAlpha();

    let errors = req.validationErrors();

        if (errors){
         errors.forEach(function (error){  //loop thru each entry
         messages.push(error.msg);         //display error message in the array
        });
        res.redirect("/");

      }

      if(userletter !== -1){
        for (var i = 0; i < randomWord.length; i++){
          if(randomWord[i] === letter && userGuesses.indexOf(letter)=== -1){
            dashedWord[i] = randomWord[i];
            points++;
            userGuesses.push(letter);
          }
          }
        } else {
             wrongLetters.push(letter);
             attempts = attempts - 1;
           }



         if (attempts === 0) {
            res.redirect("/gameover");
          } else if (points === randomWord.length){
            res.redirect("/winner");
          }

          res.redirect("/");
      });

app.get("/", function(req, res){
  res.render("index",{dashedWords:dashedWord, wrongLetters:wrongLetters, correctLetters:userGuesses, errors:messages, attempts:attempts});
});

app.listen(3000, function (){
console.log("App is running on port 3000");
});
