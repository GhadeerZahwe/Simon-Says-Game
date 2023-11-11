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


document.getElementById("green").addEventListener("click", function () {
  handleUserClick("green");
});

document.getElementById("red").addEventListener("click", function () {
  handleUserClick("red");
});

document.getElementById("yellow").addEventListener("click", function () {
  handleUserClick("yellow");
});

document.getElementById("blue").addEventListener("click", function () {
  handleUserClick("blue");
});
