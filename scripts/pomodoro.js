// Selecting elements
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const timerContainer = document.getElementById("timerDisplay");

let isRunning = false;
let interval;
let minutes = 20;
let seconds = 0;

// Function to update timer display
function updateTimer() {
    timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Start/Stop button functionality
startButton.addEventListener("click", function () {
    if (!isRunning) {
        isRunning = true;
        startGif();
        startButton.textContent = "Stop";
        timerContainer.style.border = "1px solid lightgray";

        interval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(interval);
                isRunning = false;
                startButton.textContent = "Start";
                return;
            }

            updateTimer();
        }, 1000);
    } else {
        clearInterval(interval);
        isRunning = false;
        stopGif();
        startButton.textContent = "Start";
        timerContainer.style.border = "2px solid red";
    }
});

// Reset button functionality
resetButton.addEventListener("click", function () {
  clearInterval(interval);
  isRunning = false;
  minutes = 20;
  seconds = 0;
  updateTimer();
  startButton.textContent = "Start";
  timerContainer.style.border = "none";
  stopGif(); // ← dodaj to
});


// Initial display update
updateTimer();

const gif = document.getElementById("gif");
const gifPath = "gifs/giphy.gif"; // oryginalna ścieżka do gifa

function startGif() {
  gif.src = "gifs/image.png";
  gif.src = gifPath;
}

function stopGif() {
  gif.src = "gifs/image.png";
}
