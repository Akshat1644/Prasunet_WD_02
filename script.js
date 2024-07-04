let startTime, updatedTime, difference, tInterval, countdownTime;
let running = false;
let countdown = false;
let timeDisplay = document.getElementById('time-display');
let startPauseBtn = document.getElementById('start-pause');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let countdownInput = document.getElementById('countdown-input');
let laps = document.getElementById('laps');

function startPause() {
    if (!running) {
        if (countdownInput.value) {
            countdownTime = parseInt(countdownInput.value) * 60 * 1000;
            startTime = new Date().getTime() + countdownTime;
            countdown = true;
        } else {
            startTime = new Date().getTime() - (difference || 0);
            countdown = false;
        }
        tInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
        countdownInput.disabled = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
        countdownInput.disabled = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    countdown = false;
    timeDisplay.textContent = '00:00:00:00';
    startPauseBtn.textContent = 'Start';
    countdownInput.disabled = false;
    countdownInput.value = '';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        let lapTime = document.createElement('div');
        lapTime.textContent = timeDisplay.textContent;
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    if (countdown) {
        difference = startTime - updatedTime;
        if (difference <= 0) {
            clearInterval(tInterval);
            difference = 0;
            running = false;
            countdown = false;
            startPauseBtn.textContent = 'Start';
            countdownInput.disabled = false;
        }
    } else {
        difference = updatedTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timeDisplay.textContent = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
