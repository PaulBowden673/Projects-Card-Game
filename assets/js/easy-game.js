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

// Variables for easy-game
const easyGameGrid = document.querySelector('#board');
const counter = document.querySelector('#count');
var easyCardsSelected = [];
var easyCardsSelectedId = [];
var easyCardsRight = [];

document.getElementById('easy-button').addEventListener('click', startEasyGame);

function startEasyGame() {
    displayGame();
    createEasyBoard();
    document.getElementById('reset').addEventListener('click', resetEasyGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
    
}

const kittenCardsEasy = kittenCardsMedium.slice(0, 6);

// Credit for function: Ania Kubow you-tube
function createEasyBoard() {
    // Credit for .sort method of shuffling: Marina Ferreira
    kittenCardsEasy.sort(() => 0.5 - Math.random());
    // game board id changed to fit in browser
    easyGameGrid.id = 'easyboard';
    for (let i = 0; i < kittenCardsEasy.length; i++) {
        var easyCard = document.createElement('img');
        easyCard.setAttribute('src', './assets/images/kitten-card-back.png');
        easyCard.setAttribute('data-id', i);
        // Add alt text to make sure screen reader users can also play the game
        easyCard.setAttribute('alt', 'Card back, select to flip over');
        easyCard.classList.add('col-6', 'col-lg-4', 'kittenCard');
        easyCard.addEventListener('click', flipEasyCard);
        easyGameGrid.appendChild(easyCard);
    }
}

// Reveals front card faces and calls function to check for a match
function flipEasyCard() {
    var easyCardId = this.getAttribute('data-id'); // getting attribute from element clicked
    easyCardsSelected.push(kittenCardsEasy[easyCardId].name);
    easyCardsSelectedId.push(easyCardId);
    this.setAttribute('src', kittenCardsEasy[easyCardId].img);
    this.setAttribute('alt', kittenCardsEasy[easyCardId].name);
    if (easyCardsSelected.length === 2) {
        checkEasyMatch(); 
    } else if (easyCardsSelected.length > 2) {
        this.setAttribute('src', './assets/images/kitten-card-back.png');
    }
    // Bug fix: To prevent more than 2 cards being tested at the same time the array length is limited. Credit: Stack overflow, see credits in README.md for more details
    easyCardsSelected.length = Math.min(easyCardsSelected.length, 2);
}

// Check for a match. Credit: Ania Kubrow You-tube
function checkEasyMatch() {
    var easyCards = document.querySelectorAll('img');
    const easyCardOneId = easyCardsSelectedId[0];
    const easyCardTwoId = easyCardsSelectedId[1];
      if (easyCardsSelected[0] === easyCardsSelected[1] && easyCardOneId !== easyCardTwoId) {
        easyCardsRight.push(easyCardsSelected);
        // Moves the counter
        moveCounter();
        easyCards[easyCardOneId].removeEventListener("click", flipEasyCard);
        easyCards[easyCardTwoId].removeEventListener("click", flipEasyCard);
        // Matched cards feedback
        easyCards[easyCardOneId].classList.add('match');
        easyCards[easyCardTwoId].classList.add('match');
    } else {
        moveCounter();
        // Credit for setTimeout: Free Code Camp
        setTimeout(changeCardBack, 400);
        function changeCardBack() {
            easyCards[easyCardOneId].setAttribute('src', './assets/images/kitten-card-back.png');
            easyCards[easyCardTwoId].setAttribute('src', './assets/images/kitten-card-back.png');
            easyCards[easyCardOneId].setAttribute('alt', 'Card back, select to flip over');
            easyCards[easyCardTwoId].setAttribute('alt', 'Card back, select to flip over');
        };
    }

       // Resets array of cards
       easyCardsSelected = [];
       easyCardsSelectedId = [];
       resultDisplay.textContent = easyCardsRight.length; 
       if (easyCardsRight.length === kittenCardsEasy.length/2) {
           setTimeout(correctEasyMatch, 200);        
       }
   }
   function correctEasyMatch() {
    alert('WOW Easy Tiger, you found all the Kittens. Try a harder setting!');
    resetEasyGame();
}


// Move counter 
function moveCounter() {
    counter.innerHTML ++;
}

// Reset game
function resetEasyGame() {
    easyCardsSelected = [];
    easyCardsSelectedId = [];
    easyCardsRight = [];
    //Shuffles cards
    easyCards = document.querySelectorAll('img');
    fruitCardsEasy.sort(() => 0.5 - Math.random());
    easyCards.forEach((c) => {
        c.setAttribute('src', './assets/images/kitten-card-back.png');
        c.addEventListener('click', flipEasyCard);
        c.classList.remove('match');
    });
    resultDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
}

// Reset timer
function resetTimer() {
    document.getElementById('seconds').innerHTML = `00`;
    document.getElementById('minutes').innerHTML = `00`;
    totalSeconds = `0`;
}