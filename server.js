const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 5500;

app.use(express.static("public"));

var homeScore = 0;
var awayScore = 0;
var minutes = 0;
var seconds = 0;
var timerInterval;
var homeInitials = 'HOME';
var awayInitials = 'AWAY';

function updateScore(team, action) {
    if (team === 'home') {
        if (action === 'increase') {
            homeScore++;
        } else if (action === 'decrease' && homeScore > 0) {
            homeScore--;
        }
    } else if (team === 'away') {
        if (action === 'increase') {
            awayScore++;
        } else if (action === 'decrease' && awayScore > 0) {
            awayScore--;
        }
    }
    io.emit('score', { homeScore, awayScore });
}

function startTimer() {
    timerInterval = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        io.emit('time', { minutes, seconds });
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function reset() {
    homeScore = 0;
    awayScore = 0;
    minutes = 0;
    seconds = 0;
    homeInitials = 'HOME';
    awayInitials = 'AWAY';
    io.emit('score', { homeScore, awayScore });
    io.emit('time', { minutes, seconds });
}

function setTeamInitials(team, initials) {
    if (team === 'home') {
        homeInitials = initials;
    } else if (team === 'away') {
        awayInitials = initials;
    }
    io.emit('team-initials', { homeInitials, awayInitials });
}

io.on('connection', (socket) => {
    console.log('A user has connected.');

    socket.emit('score', { homeScore, awayScore });
    socket.emit('time', { minutes, seconds });

    socket.on('update-score', ({ team, action }) => {
        updateScore(team, action);
    });

    socket.on('start-timer', () => {
        startTimer();
    });

    socket.on('stop-timer', () => {
        stopTimer();
    });

    socket.on('reset', () => {
        reset();
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    });
});

http.listen(port, () => {
    console.log('Server is listening on port ' + port + '.');
});
