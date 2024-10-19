// Get references to DOM elements
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

let stopwatchInterval;
let startTime = 0;
let elapsedTime = 0;
let paused = true;
let laps = [];

// Update the time display
function updateTimeDisplay(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);
  const hours = Math.floor(time / 3600000);

  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
}

// Start the stopwatch
function startStopwatch() {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimeDisplay(elapsedTime);
    }, 10);
  }
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

// Pause the stopwatch
function pauseStopwatch() {
  paused = true;
  clearInterval(stopwatchInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Reset the stopwatch
function resetStopwatch() {
  paused = true;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  updateTimeDisplay(0);
  laps = [];
  lapList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

// Record a lap
function recordLap() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  const lapIndex = laps.length;
  const formattedLapTime = `${String(Math.floor(lapTime / 60000) % 60).padStart(2, '0')}:${String(Math.floor((lapTime / 1000) % 60)).padStart(2, '0')}.${String(Math.floor((lapTime % 1000) / 10)).padStart(2, '0')}`;
  lapItem.textContent = `Lap ${lapIndex}: ${formattedLapTime}`;
  lapList.appendChild(lapItem);
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
