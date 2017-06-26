//make the router
const express = require('express');
const router = express.Router();

//number model
const  = require('../model/gamefunction');

app.get("/game", function(req, res){
  if (attempts > 0) {
    for (var j = 0; j < randomWord_letters; j++){
      if(randomWord_letters[j] !== userLetters){
        wrongLetters.push(userLetters);
        attempts = attempts - 1;

        res.render("game", {dashedWords:dashes, wrongLetters:userLetters});
      }else if (randomWord_letters[n] === userLetters){
         dashes[n] = userLetters;
         new_dashes = dashes.join('');
         console.log(new_dashes);

         res.render("game",{dashedWords:new_dashes});
      } else {
         gameOver.msg = "You lose!";
         res.render("game", {gameOver:"You lose!"});
             }
  }
  }
});


/Export the router
module.exports = router;
