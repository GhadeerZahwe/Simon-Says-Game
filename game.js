// Array to store user clicked pattern
const userClickedPattern = [];

// Possible button colors
const buttonColors = ["red", "blue", "green", "yellow"];

// Current level of the game
let level = 0;

// Boolean to track if the game has started
let started = false;

// Counter for user clicks in the current level
let userClickCounter = 0;

// Event listener for the green button click
document.getElementById("green").addEventListener("click", function () {
  handleUserClick("green");
});

// Event listener for the red button click
document.getElementById("red").addEventListener("click", function () {
  handleUserClick("red");
});

// Event listener for the yellow button click
document.getElementById("yellow").addEventListener("click", function () {
  handleUserClick("yellow");
});

// Event listener for the blue button click
document.getElementById("blue").addEventListener("click", function () {
  handleUserClick("blue");
});

// Function to handle user clicks
function handleUserClick(color) {
  // Apply animation and sound for the clicked color
  pressedAnimationAndSound(color);

  // If the game has started, record the user's click and increment the counter
  if (started) {
    userClickedPattern.push(color);
    userClickCounter++;
  }

  // Check the game status
  gameStarted();
}

// Function to apply animation and sound for a color
function pressedAnimationAndSound(color) {
  // Add a class for the pressed animation
  document.getElementById(color).classList.add("pressed");

  // Remove the class after a short delay for animation
  setTimeout(function () {
    document.getElementById(color).classList.remove("pressed");
  }, 50);

  // Play the sound associated with the color
  const audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// Function to handle game status
function gameStarted() {
  // If the game hasn't started, initialize and start the first level
  if (!started) {
    document.getElementById("level-title").innerText = "Level " + 1;
    setTimeout(function () {
      nextLevel();
    }, 500);
    started = true;
  } else {
    // Check the user's answer if the game has started
    checkAnswer();
  }
}

// Array to store the game pattern
const gamePattern = [];

// Function to move to the next level
function nextLevel() {
  // Increment the level
  level++;

  // Update the displayed level
  document.getElementById("level-title").innerText = "Level " + level;

  // Generate a random color for the game pattern
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];

  // Add the random color to the game pattern
  gamePattern.push(randomColor);

  // Apply animation and sound for the generated color
  pressedAnimationAndSound(randomColor);

  // Reset the user click counter
  userClickCounter = 0;
}

// Function to check if the user's answer is correct
function checkAnswer() {
  // Check if the user's pattern length matches the game pattern length
  if (userClickedPattern.length === gamePattern.length) {
    // Check if the user's pattern matches the game pattern
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      // Move to the next level after a delay
      setTimeout(function () {
        nextLevel();
      }, 1000);

      // Clear the user's clicked pattern array
      userClickedPattern.length = 0;
    } else {
      // If patterns don't match, end the game
      gameOver();
    }
  } else {
    // Check individual elements if the lengths don't match
    for (let i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
        // If elements don't match, end the game
        gameOver();
      }
    }
  }
}

// Function to restart the game
function restart() {
  // Reset game-related variables
  level = 0;
  started = false;
  userClickCounter = 0;

  // Clear game pattern and user clicked pattern arrays
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}

// Function to handle game over
function gameOver() {
  // Play a wrong sound
  const audio = new Audio("./sounds/wrong.mp3");
  audio.play();

  // Apply game-over style to the body
  document.body.classList.add("game-over");

  restart();
}

// Event listener for keypress to restart the game
document.addEventListener("keypress", function () {
  restart();
  gameStarted();
});
