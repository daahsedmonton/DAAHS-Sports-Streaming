const socket = io();

const scoreText = document.getElementsByClassName('score')[0];

socket.on('score', (data) => {
    const homeScore = data.homeScore;
    const awayScore = data.awayScore;
    if (homeScore > 99 || awayScore > 99) {
        scoreText.style.fontSize = '6rem';
    }
    else if (homeScore < 100 || awayScore < 100) {
        scoreText.style.fontSize = '7rem';
    }
    else if (homeScore < 9 || awayScore < 9) {
        scoreText.style.fontSize = '8rem';
    }
    document.getElementsByClassName('score')[0].textContent = homeScore + '-' + awayScore;
});

socket.on('time', (data) => {
    const minutes = data.minutes;
    const seconds = data.seconds;
    const formattedTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    document.getElementById('timer').textContent = formattedTime;
});

socket.on('team-initials', (data) => {
    const homeInitials = data.homeInitials;
    const awayInitials = data.awayInitials;
    document.getElementById('home-initials').textContent = homeInitials;
    document.getElementById('away-initials').textContent = awayInitials;
});