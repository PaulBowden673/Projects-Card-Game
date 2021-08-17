// Global variable score counter
const resultDisplay = document.querySelector('#result');

// Removes how to play information inserts game
function displayGame() {
    document.getElementById('board').classList.remove('no-display');
    document.getElementById('timer-and-home').classList.remove('no-display');
    document.getElementById('introduction-section').remove();
    document.getElementById('start-game-prompt').remove();
    document.getElementById('board-content').classList.remove('no-display');
    setTimer();
}
// Credit for timer functions: user efuzz on Stack Overflow.
var totalSeconds = 0;

function setTimer(){
    ++totalSeconds;
    var seconds = document.getElementById('seconds');
    seconds.innerHTML = pad(totalSeconds%60);
    var minutes = document.getElementById('minutes');
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val){
    var valString = val + '';
    if(valString.length < 2) {
        return '0' + valString;
    } else { return valString;
    }
}