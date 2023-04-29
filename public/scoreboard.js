const socket = io();

socket.on('score', (data) => {
    const homeScore = data.homeScore;
    const awayScore = data.awayScore;
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