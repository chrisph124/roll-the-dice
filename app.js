/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6 in a row, ALL his SCORE gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the final score on GLOBAL score wins the game

*/

// Create GLOBAL variables
var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  finalScore,
  btnRoll,
  btnNew,
  btnHold;
finalScore = document.querySelector(".final-score");
btnRoll = document.querySelector(".btn-roll");
btnNew = document.querySelector(".btn-new");
btnHold = document.querySelector(".btn-hold");

// Call init function to start a new game
init();

// Set up eventListener for roll the dice button, hold button, new game button
btnRoll.addEventListener("click", rollTheDice);
btnNew.addEventListener("click", init);
btnHold.addEventListener("click", holdTheDice);

// Function rollTheDice for roll the dice button
function rollTheDice() {
  // Check if value of input not empty
  // Player can't play the game (roll the dice) if they don't set the final score for input finalScore
  if (finalScore.value !== "") {
    // Check if gamePlaying still TRUE
    // If player's score greater than value of input finalScore, gamePlaying is FALSE
    if (gamePlaying) {
      // 1. Create 2 dice for random number
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result with images of the dice
      var diceDOM1 = document.getElementById("dice-1");
      diceDOM1.style.display = "block";
      diceDOM1.src = "dice-" + dice1 + ".png";

      var diceDOM2 = document.getElementById("dice-2");
      diceDOM2.style.display = "block";
      diceDOM2.src = "dice-" + dice2 + ".png";

      //3. Condition for players
      // Player will loose ALL score if they roll two 6 in a row
      if (dice1 === 6 && dice2 === 6) {
        document.querySelector("#current-" + activePlayer).textContent = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
      } else if (dice1 !== 1 && dice2 !== 1) {
        // Player will loose their ROUND score if one of the dice is 1
        diceTotal = dice1 + dice2;
        roundScore += diceTotal;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        //Next player
        nextPlayer();
      }
    }
  }
}

// Function holdTheDice for hold button. Player hit this button for keep their score and give their turn for another
function holdTheDice() {
  // Check if value of input not empty
  // Player can't play the game (keep their score and switch their turn) if they don't set the final score for input finalScore
  if (finalScore.value !== "") {
    // Check if gamePlaying still TRUE (if player's score greater than value of input finalScore, gamePlaying is FALSE)
    if (gamePlaying) {
      // Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;
      // Update the UI
      document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      // Check if player won the game (their score greater than finalScore)
      if (scores[activePlayer] >= finalScore.value) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";

        document.getElementById("dice-1").style.display = "none";
        document.getElementById("dice-2").style.display = "none";

        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");

        gamePlaying = false;
      } else {
        //Next player
        nextPlayer();
      }
    }
  }
}

// Function nextPlayer for switch player's turn
function nextPlayer() {
  // activePlayer always is player 0 in default
  // Switch the player turn with if-else statement
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Update current score back to 0 for the new turn of next player
  roundScore = 0;

  // Update UI
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

// Initialize the game or reset current game (when player click the new game button)
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
