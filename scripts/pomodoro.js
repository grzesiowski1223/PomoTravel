<<<<<<< HEAD
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
=======
        const timerDisplay = document.getElementById("time");
        const startButton = document.getElementById("startBtn");
        const resetButton = document.getElementById("resetBtn");
        const gif = document.getElementById("gif");
        const settingsBtn = document.getElementById("settings-btn");
        const settingsModal = document.getElementById("settings-modal");
        const saveSettingsBtn = document.getElementById("save-settings");
        const closeSettingsBtn = document.getElementById("close-settings");
        const workTimeInput = document.getElementById("work-time");
        const shortBreakInput = document.getElementById("short-break");
        const longBreakInput = document.getElementById("long-break");

        let config = {
            workTime: 25,
            shortBreak: 5,
            longBreak: 15,
            sessionsBeforeLongBreak: 4
        };

        let isRunning = false;
        let interval;
        let minutes = config.workTime;
        let seconds = 0;
        let sessionCount = 0;
        let isWorkMode = true;

        function init() {
            updateTimer();
            loadSettings();
        }

        function loadSettings() {
            const savedSettings = localStorage.getItem('pomodoroSettings');
            if (savedSettings) {
                config = JSON.parse(savedSettings);
                workTimeInput.value = config.workTime;
                shortBreakInput.value = config.shortBreak;
                longBreakInput.value = config.longBreak;
            }
            initTimer();
        }

        function saveSettings() {
            config = {
                workTime: parseInt(workTimeInput.value) || 25,
                shortBreak: parseInt(shortBreakInput.value) || 5,
                longBreak: parseInt(longBreakInput.value) || 15,
                sessionsBeforeLongBreak: 4
            };
            
            localStorage.setItem('pomodoroSettings', JSON.stringify(config));
            settingsModal.style.display = 'none';
            
            if (!isRunning) {
                initTimer();
            }
        }

        function initTimer() {
            minutes = isWorkMode ? config.workTime : 
                     (sessionCount % config.sessionsBeforeLongBreak === 0 ? 
                      config.longBreak : config.shortBreak);
            seconds = 0;
            updateTimer();
            stopGif();
        }

        function updateTimer() {
          document.getElementById("time").textContent = 
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function startTimer() {
            isRunning = true;
            startButton.textContent = "Stop";
            startGif();
            
            interval = setInterval(() => {
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    clearInterval(interval);
                    isRunning = false;
                    showNotification();
                    switchMode();
                    return;
                }
                updateTimer();
            }, 1000);
        }

        function stopTimer() {
            clearInterval(interval);
            isRunning = false;
            startButton.textContent = "Start";
            stopGif();
        }

        function switchMode() {
            isWorkMode = !isWorkMode;
            if (!isWorkMode) sessionCount++;
            initTimer();
            
            if (!isWorkMode) {
                setTimeout(() => {
                    if (!isRunning) {
                        startTimer();
                    }
                }, 1000);
            }
        }

        function startGif() {
            gif.src = "gifs/giphy.gif";
        }

        function stopGif() {
            gif.src = "gifs/image.png";
        }

        function showNotification() {
            const title = isWorkMode ? "Czas na przerwę!" : "Czas do pracy!";
            const body = isWorkMode ? `Sesja pracy zakończona. Przerwa: ${getBreakTime()} minut` : 
                                     "Przerwa zakończona. Czas wrócić do pracy!";
            
            if (window.electronAPI) {
                window.electronAPI.sendNotification(title, body);
            } else if (Notification.permission === "granted") {
                new Notification(title, { body });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") new Notification(title, { body });
                });
            }
        }

        function getBreakTime() {
            return sessionCount % config.sessionsBeforeLongBreak === 0 ? 
                   config.shortBreak : config.longBreak;
        }

        startButton.addEventListener("click", () => {
            if (!isRunning) {
                startTimer();
            } else {
                stopTimer();
            }
        });

        resetButton.addEventListener("click", () => {
            stopTimer();
            initTimer();
        });

        settingsBtn.addEventListener("click", () => {
            settingsModal.style.display = 'flex';
        });

        saveSettingsBtn.addEventListener("click", saveSettings);

        closeSettingsBtn.addEventListener("click", () => {
            settingsModal.style.display = 'none';
        });

        document.addEventListener("DOMContentLoaded", init);
>>>>>>> 8ef4f74 (Fixes for builds)
