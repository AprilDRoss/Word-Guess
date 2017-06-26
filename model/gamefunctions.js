
var randomIndex = Math.floor(Math.random() * words.length);
var randomWord = words[randomIndex];


//game data
 var attempts = 8;
 var dashedWords = {};
 var userLetters = "";
 var wrongLetters = [];
 var gameOver = "You lose. Play again.";
 var new_dashes = "";


var dashes = "";
for(var i =0; i < randomWord.length; i++){
  if (randomWord.charAt(i) == " ") {
   dashes += " ";
 } else {
   dashes += "-";
 }
}
dashedWords.count = dashes;

module.exports = {
  dashes:dashes,
  userLetters:userLetters,
  wrongLetters:wrongLetters,
  gameOver:gameOver,
  new_dashes:new_dashes
};
