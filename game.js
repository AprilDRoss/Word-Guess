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

cost gameRouter = require('./routes.game');
const indexRouter = require('./routes.index');

app.listen(3000, function (){
console.log("App is running on port 3000");
});
