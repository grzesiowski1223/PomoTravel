// Elementy
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const timerContainer = document.getElementById("timerDisplay");
const gif = document.getElementById("gif");

let isRunning = false;
let interval;
let minutes = 20;
let seconds = 0;

const gifPath = "gifs/giphy.gif";        // animowany gif
const gifStopped = "gifs/image.png";     // zatrzymany (statyczny)

// Ustawienie wartości domyślnej
updateTimer();

// ▶️ START / ⏸️ STOP
startButton.addEventListener("click", function () {
  if (!isRunning) {
    const parsed = parseInputTime();
    minutes = parsed.min;
    seconds = parsed.sec;

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
        stopGif();
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

// 🔁 RESET
resetButton.addEventListener("click", function () {
  clearInterval(interval);
  isRunning = false;
  const parsed = parseInputTime();
  minutes = parsed.min;
  seconds = parsed.sec;
  updateTimer();
  startButton.textContent = "Start";
  timerContainer.style.border = "none";
  stopGif();
});

// 🔄 Aktualizacja timera
function updateTimer() {
  timerDisplay.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 📥 Parsowanie czasu z inputa
function parseInputTime() {
  const [minStr, secStr] = timerDisplay.value.split(":");
  let min = parseInt(minStr);
  let sec = parseInt(secStr);
  if (isNaN(min)) min = 0;
  if (isNaN(sec)) sec = 0;
  return { min, sec };
}

// ▶️ GIF start
function startGif() {
  gif.src = gifStopped;
  gif.src = gifPath;
}

// ⏹️ GIF stop
function stopGif() {
  gif.src = gifStopped;
}
