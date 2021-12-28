//Elements from HTML
const cells = document.querySelectorAll('.cell');
const elementStatus = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');
const playerXButton = document.querySelector('.playerX');
const playerOButton = document.querySelector('.playerO');
const clickSound = new Audio('sound/sounds_click.wav');
const gameOver = new Audio('sound/sounds_game_over.wav');


//Variables
let playerX = '✕';
let playerO = '◯';
let gameActive = true;
let playerXmove = true;
let playerXScore = 0;
let playerOScore = 0;


//see who is the winner and update the board!
const winner = (className) => {
    gameActive = false;

    if (className === 'x') {
        playerXScore++;
        elementStatus.innerHTML = `Player ✕ wins!`;
        playerXButton.innerHTML = `PlayerX score: ${playerXScore}`;
    }
    else {
        playerOScore++;
        elementStatus.innerHTML = `<span>Player ◯ wins!</span>`;
        playerOButton.innerHTML = `PlayerO score: ${playerOScore}`;
    }
}
//grabing the classList for each cell and checkng for a winner
const checkGameStatus = () => {
    const firstCell = cells[0].classList[1];
    const secondCell = cells[1].classList[1];
    const thirdCell = cells[2].classList[1];
    const fourthCell = cells[3].classList[1];
    const fifthCell = cells[4].classList[1];
    const sixthCell = cells[5].classList[1];
    const seventhCell = cells[6].classList[1];
    const eighthCell = cells[7].classList[1];
    const ninethCell = cells[8].classList[1];

    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
        winner(firstCell);
        gameOver.play();
        cells[0].classList.add('strike');
        cells[1].classList.add('strike');
        cells[2].classList.add('strike');
        
    } else if (fourthCell && fourthCell === fifthCell && fourthCell === sixthCell) {
        winner(fourthCell);
        gameOver.play();
        cells[3].classList.add('strike');
        cells[4].classList.add('strike');
        cells[5].classList.add('strike');

    } else if (seventhCell && seventhCell === eighthCell && seventhCell === ninethCell) {
        winner(seventhCell);
        gameOver.play();
        cells[6].classList.add('strike');
        cells[7].classList.add('strike');
        cells[8].classList.add('strike');
    } else if (firstCell && firstCell === fourthCell && firstCell === seventhCell) {
        winner(firstCell);
        gameOver.play();
        cells[0].classList.add('strike');
        cells[3].classList.add('strike');
        cells[6].classList.add('strike');
    } else if (secondCell && secondCell === fifthCell && secondCell === eighthCell) {
        winner(secondCell);
        gameOver.play();
        cells[1].classList.add('strike');
        cells[4].classList.add('strike');
        cells[7].classList.add('strike');
    } else if (thirdCell && thirdCell === sixthCell && thirdCell === ninethCell) {
        winner(thirdCell);
        gameOver.play();
        cells[2].classList.add('strike');
        cells[5].classList.add('strike');
        cells[8].classList.add('strike');
    } else if (firstCell && firstCell === fifthCell && firstCell === ninethCell) {
        winner(firstCell);
        gameOver.play();
        cells[0].classList.add('strike');
        cells[4].classList.add('strike');
        cells[8].classList.add('strike');
    } else if (thirdCell && thirdCell === fifthCell && thirdCell === seventhCell) {
        winner(thirdCell);
        gameOver.play();
        cells[2].classList.add('strike');
        cells[4].classList.add('strike');
        cells[6].classList.add('strike');
    } else if (firstCell && secondCell && thirdCell && fourthCell && fifthCell && sixthCell &&
        seventhCell && eighthCell && ninethCell) {

        gameActive = false;
        elementStatus.innerHTML = `<em> Draw! </em>`
    } else {
        playerXmove = !playerXmove;
        if (playerXmove) {
            elementStatus.innerHTML = `Player ${playerX} is next`;
        } else {
            elementStatus.innerHTML = `<span> Player ${playerO} is next</span>`
        }
    }

};

//event handler for reset button
resetBtn.addEventListener('click', () => {
    playerXmove = true;
    elementStatus.innerHTML = `Player ${playerX} starts`;
    cells.forEach(item => {
        item.classList.remove('x');
        item.classList.remove('o');
        item.classList.remove('strike');  
    })
    gameActive = true;
})

//event handler for each cell
cells.forEach(item => {
    item.addEventListener('click', (event) => {

        const classArray = event.target.classList;
        if (classArray[1] === 'x' || classArray[1] === 'o' || !gameActive) {
            return;
        }
        if (playerXmove) {
            classArray.add('x');
            checkGameStatus();
            clickSound.play();
        }
        else {
            classArray.add('o');
            checkGameStatus();
            clickSound.play();
        }
    })
})