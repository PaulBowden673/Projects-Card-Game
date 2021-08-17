// Hides game until game difficulty level is selected
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

// start up function for hard-game
function startHardGame() {
    displayGame();
    createHardBoard();
    document.getElementById('reset').addEventListener('click', resetHardGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
}
// Array of objects to be injected into the DOM used with .slice method for all games
const kittenCardsHard = [
    { name: 'kitten1', img: './assets/images/kitten1.png', },
    { name: 'kitten1', img: './assets/images/kitten1.png', },
    { name: 'kitten2', img: './assets/images/kitten2.png', },
    { name: 'kitten2', img: './assets/images/kitten2.png', },
    { name: 'kitten3', img: './assets/images/kitten3.png', },
    { name: 'kitten3', img: './assets/images/kitten3.png', },
    { name: 'kitten4', img: './assets/images/kitten4.png', },
    { name: 'kitten4', img: './assets/images/kitten4.png', },
    { name: 'kitten5', img: './assets/images/kitten5.png', },
    { name: 'kitten5', img: './assets/images/kitten5.png', },
    { name: 'kitten6', img: './assets/images/kitten6.png', },
    { name: 'kitten6', img: './assets/images/kitten6.png', },
    { name: 'kitten7', img: './assets/images/kitten7.png', },
    { name: 'kitten7', img: './assets/images/kitten7.png', },
    { name: 'kitten8', img: './assets/images/kitten8.png', },
    { name: 'kitten8', img: './assets/images/kitten8.png', },
    { name: 'kitten9', img: './assets/images/kitten9.png', },
    { name: 'kitten9', img: './assets/images/kitten9.png', },
];

// Creates game board. Credit: Ania Kubow You-Tube video.
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
// Flips card over and calls function to check for a match
function flipHardCard() {
    var hardCardId = this.getAttribute('data-id');
    hardCardsSelected.push(kittenCardsHard[hardCardId].name);
    hardCardsSelectedId.push(hardCardId);
    // Add alt text to make sure screen reader users can also play the game
    this.setAttribute('alt', fruitCardsHard[hardCardId].name);
    this.setAttribute('src', fruitCardsHard[hardCardId].img);
    if (hardCardsSelected.length === 2) {
        setTimeout(checkHardMatch, 300);
    } else if (hardCardsSelected.length > 2) {
        this.setAttribute('src', './assets/images/kitten-card-back.png');
    }
    
}
// Check for a match. Credit: Ania Kubrow
function checkHardMatch() {
    var hardCards = document.querySelectorAll('img');
    const hardCardOneId = hardCardsSelectedId[0];
    const hardCardTwoId = hardCardsSelectedId[1];
    // Bug fix: test easyCardsSelected for true equality, not easyCardsSelectedId
    /* Bug fix: test for both match between data names and make sure ids don't match 
     to make sure users cannot pick the same card twice to count as a match */
    if (hardCardsSelected[0] === hardCardsSelected[1] && hardCardOneId !== hardCardTwoId) {
        hardCardsRight.push(hardCardsSelected);
        // Moves the counter
        moveCounter();
        // Bug fix: Remove event listener from selected cards to prevent users
        // cheating by clicking the same pair more than once
        hardCards[hardCardOneId].removeEventListener("click", flipHardCard);
        hardCards[hardCardTwoId].removeEventListener("click", flipHardCard);
        // Gives feedback to user that they found a match
        hardCards[hardCardOneId].classList.add('match');
        hardCards[hardCardTwoId].classList.add('match');
    } else {
        moveCounter();
        // Credit for setTimeout: Free Code Camp
        setTimeout(changeCardBack, 400);
        function changeCardBack() {
            hardCards[hardCardOneId].setAttribute('src', './assets/images/fruit-card-back.png');
            hardCards[hardCardTwoId].setAttribute('src', './assets/images/fruit-card-back.png');
      // Reverts alt for card images to blank  to prevent cheating 
            hardCards[hardCardOneId].setAttribute('alt', 'Card back, select to flip over');
            hardCards[hardCardTwoId].setAttribute('alt', 'Card back, select to flip over');
        };
    }

     
     hardCardsSelected = [];
     hardCardsSelectedId =[];
     resultDisplay.textContent = hardCardsRight.length;
     if (hardCardsRight.length === fruitCardsHard.length/2) {
         setTimeout(correctHardMatch, 200); 
     }
 }
 function correctHardMatch() {
    alert('WOW you are a Crazy Cat person, you found all the Kittens!');
    resetHardGame();
}
// Resets hard game
function resetHardGame() {
    hardCardsSelected = [];
    hardCardsSelectedId = [];
    hardCardsRight = [];
    hardCards = document.querySelectorAll('img');
    fruitCardsHard.sort(() => 0.5 - Math.random());
    hardCards.forEach((c) => {
        c.setAttribute('src', './assets/images/fruit-card-back.png');
        c.addEventListener('click', flipHardCard);
        // Removes correct match feedback to users
        c.classList.remove('match');
    });
    resultDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
}