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
//Validator has to go rigt after body parser
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


//var randomIndex = Math.floor(Math.random() * words.length);
//var randomWord = words[randomIndex];

var randomWord = "apples";
var randomWord_letter = randomWord.split("");
//console.log(randomWord);
console.log(randomWord_letter);

//game data
 var attempts = 8;
 var dashedWords = {};
 var wrongLetters = [];
 var gameOver = {msg: "You lose.Play again."};
 var new_dashes = "";


var dashes = "";
for(var i =0; i < randomWord.length; i++){
  if (randomWord.charAt(i) == " ") {
   dashes += " ";
 } else {
   dashes += "-";
 }
}

 app.get("/gameover", function(req, res){
   res.render("gameover",{loser:gameOver.msg});
 });

 app.get("/winner", function(req, res){
   res.render("winner");
 });

let messages = [];
// if (attempts > 0) {
app.post("/", function(req,res){

    req.checkBody("userletter", "Please enter one letter at a time").isLength({max: 1});
    req.checkBody("userletter", "Please enter a letter.").notEmpty();
    req.checkBody("userletter", "Please enter letters only").isAlpha();

    let errors = req.validationErrors();
    console.log(errors);

        if (errors){
         errors.forEach(function (error){  //loop thru each entry
         messages.push(error.msg);         //display error message in the array
        });
      //res.render("index",{errors:messages, dashedWords:dashes});
        } else {
            //userletter = req.body.userletter;
            console.log(req.body.userletter);

              for (var j = 0; j < randomWord_letter.length; j++){
                   randomWord_letter = randomWord_letter[j];

                if(randomWord_letter!== req.body.userletter){
                  wrongLetters.push(req.body.userletter);
                  attempts = attempts - 1;
                  //res.render("game", {word:dashes, wrongLetters:userLetters});

                } else if (randomWord_letter === req.body.userletter){
                   dashes[j] = req.body.userletter;
                   console.log(dashes);
                   //res.render("game",{newword:new_dashes});
                 } else {}
               }
             }
});

app.get("/", function(req, res){
  res.render("index",{dashedWords:dashes, wrongLetters:wrongLetters, errors:messages, attempts:attempts});
});

app.listen(3000, function (){
console.log("App is running on port 3000");
});
