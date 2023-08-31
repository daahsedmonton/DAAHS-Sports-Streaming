const socket = io();
let isTimerRunning = false;

const homeInitials = document.getElementById('home-initials').value.toUpperCase();
const awayInitials = document.getElementById('away-initials').value.toUpperCase();
const homeScore = document.getElementById('home-score');
const awayScore = document.getElementById('away-score');
const timer = document.getElementById('time');

function setInitials(event) {
    event.preventDefault();
    
    setTeamInitials('home', homeInitials);
    setTeamInitials('away', awayInitials);
}

function setTeamInitials(team, initials) {
    socket.emit('set-team-initials', { team, initials });
}

function setTime(event) {
    event.preventDefault();
    
    if (!isTimerRunning) {
        const minutes = document.getElementById('minutes').value;
        const seconds = document.getElementById('seconds').value;
        socket.emit('set-time', { minutes, seconds });
    }
    else {
        alert('Timer is  running! Please stop the timer and try again.');
    }
}

function updateScore(team, action) {
    socket.emit('update-score', { team, action });
}

function startTimer() {
    if (!isTimerRunning) {
        socket.emit('start-timer');
        isTimerRunning = true;
    }
    else {
        alert('Timer is already running!');
    }
}

function stopTimer() {
    socket.emit('stop-timer');
    isTimerRunning = false;
}

function reset() {
    socket.emit('stop-timer');
    isTimerRunning = false;
    socket.emit('reset');
    homeScore.textContent = 0;
    awayScore.textContent = 0;
}

socket.on('time', (data) => {
    const minutes = data.minutes;
    const seconds = data.seconds;
    const formattedTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    document.getElementById('time').textContent = formattedTime;
});

socket.on('score', (data) => {
    homeScore.textContent = data.homeScore;
    awayScore.textContent = data.awayScore;
});