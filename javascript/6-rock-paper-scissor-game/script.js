// Returns random output of either rock, paper, or scissors
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Checks if the player has won the round
function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

// Score variables
let playerScore = 0;
let computerScore = 0;

// Returns outputs of player win, tie, or loss
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++; // Increment player score
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`; // Same choice: tie
  } else {
    computerScore++; // Increment computer score
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

// DOM elements for score and messages
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

// Handles user selection and updates UI accordingly
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption); // Show who won the round
  computerScoreSpanElement.innerText = computerScore; // Update computer score
  playerScoreSpanElement.innerText = playerScore; // Update player score

  // Check for winner
  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`; // Show winner message

    resetGameBtn.style.display = "block"; // Show reset button
    optionsContainer.style.display = "none"; // Hide option buttons
  }
};

// Resets the game state and UI
function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
  winnerMsgElement.innerText = ""; // Clear winner message
  roundResultsMsg.innerText = ""; // Clear round result
};

// Event listener for reset button
resetGameBtn.addEventListener("click", resetGame);

// Buttons for player choices
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

// Event listeners for each player choice
rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});
