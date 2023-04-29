const socket = io();
var isTimerRunning = false;

function setInitials(event) {
    event.preventDefault();
    
    const homeInitials = document.getElementById('home-initials').value.toUpperCase();
    const awayInitials = document.getElementById('away-initials').value.toUpperCase();
    setTeamInitials('home', homeInitials);
    setTeamInitials('away', awayInitials);
}

function setTeamInitials(team, initials) {
    socket.emit('set-team-initials', { team, initials });
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
    if (isTimerRunning) {
        socket.emit('stop-timer');
        isTimerRunning = false;
    }
    else {
        alert('Timer is not running!');
    }
}

function reset() {
    socket.emit('stop-timer');
    isTimerRunning = false;
    socket.emit('reset');
}