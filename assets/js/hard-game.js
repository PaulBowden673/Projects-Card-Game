// Hide game until start
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('board').classList.add('no-display');
    document.getElementById('timer-and-home').classList.add('no-display');
    document.getElementById('board-content').classList.add('no-display');
});

// Variables for hard-game
const hardGameGrid = document.querySelector('#board');
var hardCardsSelected = [];
var hardCardsSelectedId = [];
var hardCardsRight = [];

document.getElementById('hard-button').addEventListener('click', startHardGame);

// Start up function for hard-game
function startHardGame() {
    displayGame();
    createHardBoard();
    document.getElementById('reset').addEventListener('click', resetHardGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
    setInterval(setTimer, 1200);
}

// Array of objects used in all games usinf=g .slice method
const kittenCardsHard = [
    { name: 'kitten 1', img: './assets/images/kitten1.png', },
    { name: 'kitten 1', img: './assets/images/kittem1.png', },
    { name: 'kitten 2', img: './assets/images/kitten2.png', },
    { name: 'kitten 2', img: './assets/images/kitten2.png', },
    { name: 'kitten 3', img: './assets/images/kitten3.png', },
    { name: 'kitten 3', img: './assets/images/kitten3.png', },
    { name: 'kitten 4', img: './assets/images/kitten4.png', },
    { name: 'kitten 4', img: './assets/images/kitten4.png', },
    { name: 'kitten 5', img: './assets/images/kitten5.png', },
    { name: 'kitten 5', img: './assets/images/kitten5.png', },
    { name: 'kitten 6', img: './assets/images/kitten6.png', },
    { name: 'kitten 6', img: './assets/images/kitten6.png', },
    { name: 'kitten 7', img: './assets/images/kitten7.png', },
    { name: 'kitten 7', img: './assets/images/kitten7.png', },
    { name: 'kitten 8', img: './assets/images/kitten8.png', },
    { name: 'kitten 8', img: './assets/images/kitten8.png', },
    { name: 'kitten 9', img: './assets/images/kitten9.png', },
    { name: 'kitten 9', img: './assets/images/kitten9.png', },
];

// Game board. Credit: Ania Kubow You-Tube
function createHardBoard() {
    kittenCardsHard.sort(() => 0.5 - Math.random());
    for (let i = 0; i < kittenCardsHard.length; i++) {
        var hardCard = document.createElement('img');
        hardCard.setAttribute('src', './assets/images/kitten-card-back.png');
        hardCard.setAttribute('data-id', i);
        hardCard.setAttribute('alt', 'Card back, select to flip over');
        hardCard.classList.add('col-4', 'col-lg-2', 'kittenHardCard');
        hardCard.addEventListener('click', flipHardCard);
        hardGameGrid.appendChild(hardCard);
    }
}

// Flips cards and checks for match
function flipHardCard() {
    var hardCardId = this.getAttribute('data-id');
    hardCardsSelected.push(kittenCardsHard[hardCardId].name);
    hardCardsSelectedId.push(hardCardId);
    // ScreenReader text
    this.setAttribute('alt', kittenCardsHard[hardCardId].name);
    this.setAttribute('src', kittenCardsHard[hardCardId].img);
    if (hardCardsSelected.length === 2) {
        setTimeout(checkHardMatch, 300);
    } else if (hardCardsSelected.length > 2) {
        this.setAttribute('src', './assets/images/kitten-card-back.png');
    }
    hardCardsSelected.length = Math.min(hardCardsSelected.length, 2);
}

// Match function. Credit: Ania Kubrow You-Tube
function checkHardMatch() {
    var hardCards = document.querySelectorAll('img');
    const hardCardOneId = hardCardsSelectedId[0];
    const hardCardTwoId = hardCardsSelectedId[1];
    if (hardCardsSelected[0] === hardCardsSelected[1] && hardCardOneId !== hardCardTwoId) {
        hardCardsRight.push(hardCardsSelected);
    
        moveCounter();
        
        hardCards[hardCardOneId].removeEventListener("click", flipHardCard);
        hardCards[hardCardTwoId].removeEventListener("click", flipHardCard);
        // Feedback on match
        hardCards[hardCardOneId].classList.add('match');
        hardCards[hardCardTwoId].classList.add('match');
    } else {
        moveCounter();
        // Credit for setTimeout: Free Code Camp
        setTimeout(changeCardBack, 400);
        function changeCardBack() {
            hardCards[hardCardOneId].setAttribute('src', './assets/images/kitten-card-back.png');
            hardCards[hardCardTwoId].setAttribute('src', './assets/images/kitten-card-back.png');
        
            hardCards[hardCardOneId].setAttribute('alt', 'Card back, select to flip over');
            hardCards[hardCardTwoId].setAttribute('alt', 'Card back, select to flip over');
        };
    }
    // Reset array
    hardCardsSelected = [];
    hardCardsSelectedId =[];
    resultDisplay.textContent = hardCardsRight.length;
    if (hardCardsRight.length === kittenCardsHard.length/2) {
        setTimeout(correctHardMatch, 200); 
    }
}

function correctHardMatch() {
    alert('Wow you Crazy Cat Person, you found all the kittens!');
    resetHardGame();
}

// Reset hard-game
function resetHardGame() {
    hardCardsSelected = [];
    hardCardsSelectedId = [];
    hardCardsRight = [];
    hardCards = document.querySelectorAll('img');
    kittenCardsHard.sort(() => 0.5 - Math.random());
    hardCards.forEach((c) => {
        c.setAttribute('src', './assets/images/kitten-card-back.png');
        c.addEventListener('click', flipHardCard);
        // Remove match feedback 
        c.classList.remove('match');
    });
    resultDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
}