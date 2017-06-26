//make the router
const express = require('express');
const router = express.Router();

//number model
const  = require('../model/gamefunction');

router.get("/", function(req, res){
  //setting up render "name of file to render", {object:data to send to endpoint}
  res.render("index", {dashedWords:dashes});
});

let messages = [];
router.post("/", function(req,res){
  //console.log(userLetters);

  req.checkBody("letters", "Please enter one letter at a time").isLength({max: 1});
  req.checkBody("letters", "Please enter a letter.").notEmpty();

  let errors = req.validationErrors();
  if (errors){
    errors.forEach(function (error){  //loop thru each entry
     messages.push(error.msg);         //display error message in the array
    });
      res.render("index",{error:messages, dashedWords:dashes});
} else{
  userLetters = req.body.letters;
  res.redirect("/game");
  console.log(userLetters);
}
});

/Export the router
module.exports = router;
